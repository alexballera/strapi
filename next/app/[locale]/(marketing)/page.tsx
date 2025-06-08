import { Metadata } from 'next';

import PageContent from '@/lib/shared/PageContent';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import ClientSlugHandler from './ClientSlugHandler';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {

  const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: "homepage",
        locale: params.locale,
      },
      populate: "seo.metaImage",
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function HomePage({ params }: { params: { locale: string } }) {

  const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: "homepage",
        locale: params.locale,
      },
    },
    true
  );

  const localizedSlugs = pageData?.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = "";
      return acc;
    },
    { [params.locale]: "" }
  ) || { [params.locale]: "" };

  // Si no hay datos de página, mostrar un mensaje por defecto
  if (!pageData) {
    return (
      <>
        <ClientSlugHandler localizedSlugs={localizedSlugs} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to LaunchPad</h1>
          <p className="text-lg text-gray-600 mb-8">
            Content is being loaded. Please check back soon.
          </p>
          <p className="text-sm text-gray-500">
            Current locale: {params.locale}
          </p>
        </div>
      </>
    );
  }

  return <>
    <ClientSlugHandler localizedSlugs={localizedSlugs} />
    <PageContent pageData={pageData} />
  </>;
}
