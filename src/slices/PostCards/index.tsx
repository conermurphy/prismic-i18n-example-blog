import type {
  Content,
  FilledContentRelationshipField,
} from '@prismicio/client';
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
  PrismicLink,
} from '@prismicio/react';

/**
 * Props for `PostCards`.
 */
export type PostCardsProps = SliceComponentProps<Content.PostCardsSlice>;

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <h2 className="font-bold text-2xl">{children}</h2>
  ),
  paragraph: ({ children }) => <p className="text-slate-700">{children}</p>,
};

/**
 * Component for "PostCards" Slices.
 */
const PostCards = ({ slice }: PostCardsProps): JSX.Element => {
  const sortedPosts = slice.items.sort((a, b) => {
    const dateA = new Date(a.publicationdate || '');
    const dateB = new Date(b.publicationdate || '');
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="grid grid-cols-2 gap-8">
      {sortedPosts.map((item, i) => {
        const link = item.link as FilledContentRelationshipField;

        return (
          <PrismicLink
            href={link.url || ''}
            key={`${item.title.toString()}-${i}`}
            className="flex flex-col gap-2 hover:bg-blue-50 rounded-lg duration-300 ease-in-out transition-all p-2"
          >
            <p className="font-regular">
              {new Date(item?.publicationdate || '').toLocaleDateString()}
            </p>
            <PrismicRichText field={item.title} components={components} />
            <PrismicRichText field={item.description} components={components} />
            <div className="border-b border-solid border-gray-200 w-12 mt-8" />
          </PrismicLink>
        );
      })}
    </section>
  );
};

export default PostCards;
