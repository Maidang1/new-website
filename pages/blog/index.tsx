interface Files {
  filepath: string;
  lastModifyTime: string;
  fileName: string;
}

interface BlogsProps {
  files: Files[];
}

export default function Blogs(props: BlogsProps) {
  const { files } = props;
  return (
    <>
      {files.map(({ lastModifyTime, fileName }) => (
        <a
          href={`/blog/posts/${fileName}`}
          key={fileName}
          className='item block font-normal mb-6 mt-2 opacity-60 border-none no-underline cursor-pointer text-black hover:opacity-100 transition-all ease-linear'
        >
          <li className='no-underline list-none flex md:flex-row flex-col gap-2 md:items-center'>
            <span className='text-lg leading-3 flex gap-2 flex-wrap align-middle'>
              {fileName}
            </span>
            <span className='text-sm'>{lastModifyTime}</span>
          </li>
        </a>
      ))}
    </>
  );
}

export const getStaticProps = async () => {
  const path = await import('path');
  const { recursiveReaddir } = await import('../../utils/index');
  const { generateFileInfo } = await import('../../utils/fileInfo');
  const postDir = path.join(process.cwd(), 'pages/blog/posts');
  const files = await recursiveReaddir(postDir);
  const fileInfos = await Promise.all(
    files.map(async (file) => {
      const info = await generateFileInfo(file)!;
      const { ctimeMs } = info!;

      return {
        filepath: file,
        lastModifyTime: new Date(ctimeMs).toDateString(),
        fileName: path.parse(file).name,
      };
    })
  );
  return {
    props: {
      files: fileInfos,
    },
  };
};
