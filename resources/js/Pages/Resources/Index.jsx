import React from 'react';
import Layout from '../../Components/Layout';
import Container from '../../Components/ui/Container';
import SectionHeader from '../../Components/ui/SectionHeader';
import Pagination from '../../Components/ui/Pagination';
import TagFilter from '../../Components/ui/TagFilter';
import SearchInput from '../../Components/ui/SearchInput';
import ResourceCard from '../../Components/resources/ResourceCard';

export default function ResourcesIndex({
  profile,
  whatsapp,
  socialLinks,
  resources = { data: [], links: [] },
  availableTags = [],
  selectedTags = [],
  search = '',
}) {
  const resourceList = resources.data ?? [];
  const currentPage = resources.current_page ?? 1;

  // Filtered/searched/paginated views get their own title + description so
  // search engines don't see identical metadata across every query state.
  const baseTitle = 'Resources';
  const pageSuffix = currentPage > 1 ? ` — Page ${currentPage}` : '';
  const filterSuffix = search
    ? ` — "${search}"`
    : selectedTags.length > 0
      ? ` — ${selectedTags.join(', ')}`
      : '';
  const pageTitle = `${baseTitle}${filterSuffix}${pageSuffix} - ${profile.name}`;

  const pageDescription =
    search || selectedTags.length > 0
      ? `Free code bundles, templates, and setup guides matching ${
          search ? `"${search}"` : selectedTags.join(', ')
        }.`
      : 'Free code bundles, templates, and setup guides.';

  // First resource with a thumbnail makes a reasonable OG/Twitter preview
  // image for the listing page; Layout falls back to the site default otherwise.
  const previewImage = resourceList.find((r) => r.thumbnail_url)?.thumbnail_url;

  const canonicalUrl = typeof route === 'function' ? route('resources.index') : undefined;

  const itemListElement = resourceList.map((resource, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: typeof route === 'function' ? route('resources.show', resource.slug) : undefined,
    name: resource.title,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDescription,
    ...(canonicalUrl && { url: canonicalUrl }),
    ...(itemListElement.length > 0 && {
      mainEntity: {
        '@type': 'ItemList',
        itemListElement,
      },
    }),
  };

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      profile={profile}
      whatsapp={whatsapp}
      socialLinks={socialLinks}
      image={previewImage}
      keywords={availableTags}
      jsonLd={jsonLd}
    >
      <section className="py-24 md:py-32 pt-40">
        <Container>
          <SectionHeader
            eyebrow="Resources"
            heading="Downloads"
            description="Code bundles and templates, free to use in your own projects."
          />

          <div className="mb-6 max-w-sm">
            <SearchInput
              routeName="resources.index"
              initialValue={search}
              extraParams={selectedTags.length ? { tags: selectedTags } : {}}
              placeholder="Search resources…"
            />
          </div>

          <TagFilter
            routeName="resources.index"
            tags={availableTags}
            selectedTags={selectedTags}
            extraParams={search ? { search } : {}}
          />

          {resourceList.length === 0 ? (
            <p className="text-text-muted">
              {search || selectedTags.length > 0
                ? 'No resources match your filters.'
                : 'No resources published yet — check back soon.'}
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {resourceList.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>

              <Pagination links={resources.links} />
            </>
          )}
        </Container>
      </section>
    </Layout>
  );
}