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

  return (
    <Layout
      title={`Resources - ${profile.name}`}
      description="Free code bundles, templates, and setup guides."
      profile={profile}
      whatsapp={whatsapp}
      socialLinks={socialLinks}
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
