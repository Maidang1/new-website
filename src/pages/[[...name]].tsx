import fs from "fs"
import path from "path"
import { prepareMDX } from "../utils/prepare-mdx"
import { Fragment, useMemo } from "react"

function reviveNodeOnClient(key: string, val: string) {
  if (Array.isArray(val) && val[0] == "$r") {
    // Assume it's a React element.
    let type = val[1]
    let key = val[2]
    let props = val[3]

    if (!type) {
      console.error("Unknown type: " + type)
      type = Fragment
    }
    return {
      $$typeof: Symbol.for("react.element"),
      type: type,
      key: key,
      ref: null,
      props: props,
      _owner: null,
    }
  } else {
    return val
  }
}
export default function Home(props: any) {
  const { content, toc } = props

  const parsedContent = useMemo(
    () => JSON.parse(content, reviveNodeOnClient),
    [content]
  )
  const parsedToc = useMemo(() => JSON.parse(toc, reviveNodeOnClient), [toc])
  return (
    <main className="flex">
      <div>
        {parsedToc.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </div>
      <div>{parsedContent}</div>
    </main>
  )
}

export async function getStaticPaths() {
  const fs = await import("fs-extra")
  const path = await import("path")
  const postDir = path.join(process.cwd(), "src", "posts")

  const getFiles = async (dir: string) => {
    const subDirs = await fs.readdir(dir)
    const files = (await Promise.all(
      subDirs.map(async (subDir) => {
        const res = path.resolve(dir, subDir)
        const isDir = (await fs.stat(res)).isDirectory()
        return isDir ? getFiles(res) : res.slice(postDir.length + 1)
      })
    )) as string[]

    return files.flat().filter((file) => file.endsWith(".mdx"))
  }

  function getSegments(file: string) {
    let segments = file.slice(0, -4).replace(/\\/g, "/").split("/")
    if (segments[segments.length - 1] === "index") {
      segments.pop()
    }
    return segments
  }
  const files = await getFiles(postDir)
  const paths = files.map((file) => {
    return {
      params: {
        name: getSegments(file),
      },
    }
  })
  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const postDir = path.join(process.cwd(), "src", "posts")

  const reqPath = (context.params.name || []).join("/") || "index"
  let mdx
  try {
    mdx = fs.readFileSync(path.join(postDir, `${reqPath}.mdx`), "utf8")
  } catch {
    mdx = fs.readFileSync(path.join(postDir, reqPath, "index.mdx"), "utf8")
  }

  const { remarkPlugins } = await import("../plugins/markdown-to-html")
  const { compile: compileMdx } = await import("@mdx-js/mdx")
  const jsxCode = await compileMdx(mdx, {
    remarkPlugins: [
      ...remarkPlugins.remarkPlugins,
      (await import("remark-gfm")).default,
      (await import("remark-frontmatter")).default,
    ],
  })
  const babelCode = jsxCode.toString() || ""
  const { transform } = await import("@babel/core")
  const jsCode = transform(babelCode, {
    plugins: ["@babel/plugin-transform-modules-commonjs"],
    presets: ["@babel/preset-react"],
  })!.code as string

  let fakeExports: {
    default: (...args: any) => any
  } = {
    default: () => {},
  }
  const fakeRequire = (name: string) => {
    if (name === "react/jsx-runtime") {
      return require("react/jsx-runtime")
    }
    if (name === "react/jsx-dev-runtime") {
      return require("react/jsx-dev-runtime")
    } else {
      return name
    }
  }
  const evalJSCode = new Function("require", "exports", jsCode)
  evalJSCode(fakeRequire, fakeExports)
  const reactTree = fakeExports.default({})

  let [toc, children] = prepareMDX(reactTree.props.children)
  if (reqPath === "index") {
    toc = []
  }
  const fm = (await import("gray-matter")).default
  const meta = fm(mdx).data
  const output = {
    props: {
      content: JSON.stringify(children, stringifyNodeOnServer),
      toc: JSON.stringify(toc, stringifyNodeOnServer),
      meta,
    },
  }

  function stringifyNodeOnServer(key: any, val: any) {
    if (val != null && val.$$typeof === Symbol.for("react.element")) {
      const { mdxType, originalType, parentName, ...cleanProps } = val.props
      return [
        "$r",
        typeof val.type === "string" ? val.type : mdxType,
        val.key,
        cleanProps,
      ]
    } else {
      return val
    }
  }

  return output
}
