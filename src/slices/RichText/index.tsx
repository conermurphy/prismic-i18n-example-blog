import type { Content } from '@prismicio/client';
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from '@prismicio/react';

const components: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === 'codespan') {
      return <code>{children}</code>;
    }
  },
  heading1: ({ children }) => (
    <h1 className="font-bold text-4xl">{children}</h1>
  ),
  paragraph: ({ children }) => <p className="text-slate-700">{children}</p>,
  hyperlink: ({ children, node }) => (
    <a href={node.data.url} className="font-bold underline">
      {children}
    </a>
  ),
};

type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

export default function RichText({ slice }: RichTextProps) {
  return (
    <section className="flex flex-col gap-2">
      <PrismicRichText field={slice.primary.content} components={components} />
    </section>
  );
}
