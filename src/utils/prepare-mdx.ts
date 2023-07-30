import { Children } from "react";

export function prepareMDX(rawChildren: any) {
  const toc = getTableOfContents(rawChildren, /* depth */ 10);
  return [toc, rawChildren]
}

function getTableOfContents(children: any[], depth: number) {
  const anchors: any[] = [];
  extractHeaders(children, depth, anchors);
  if (anchors.length > 0) {
    anchors.unshift({
      url: '#',
      text: 'Overview',
      depth: 2,
    });
  }
  return anchors;
}

const headerTypes = new Set([
  'h1',
  'h2',
  'h3',
]);
function extractHeaders(children: any[], depth: number, out: any[]) {
  for (const child of Children.toArray(children) as any[]) {
    if (child.type && headerTypes.has(child.type)) {
      const header = {
        url: '#' + child.props.id,
        depth: (child.type && parseInt(child.type.replace('h', ''), 0)) ?? 0,
        text: child.props.children,
      };
      out.push(header);
    } else if (child.children && depth > 0) {
      extractHeaders(child.children, depth - 1, out);
    }
  }
}
