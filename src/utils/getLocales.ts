import { Client } from '@prismicio/client';
import { AllDocumentTypes } from '../../prismicio-types';

export async function getLocales(
  doc: AllDocumentTypes,
  client: Client<AllDocumentTypes>
) {
  const [repository, altDocs] = await Promise.all([
    client.getRepository(),
    doc.alternate_languages.length > 0
      ? client.getAllByIDs(
          doc.alternate_languages.map((altLang) => altLang.id),
          {
            lang: '*',
            // Exclude all fields to speed up the query.
            fetch: `${doc.type}.__nonexistent-field__`,
          }
        )
      : Promise.resolve([]),
  ]);

  return [doc, ...altDocs].map((page) => {
    const lang = repository?.languages.find((l) => l.id === page.lang);

    return {
      lang: lang?.id || '',
      url: page?.url || '',
      lang_name: lang?.name || '',
    };
  });
}
