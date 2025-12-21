import { StructureBuilder } from 'sanity/structure';

/**
 * SIMPLIFIED CMS NAVIGATION
 * Clean interface for managers
 */

export const deadSimpleCMS = (S: StructureBuilder) =>
  S.list()
    .title('Your Website')
    .items([

      // HOMEPAGE
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Edit Homepage')
        ),

      S.divider(),

      // ROOMS
      S.listItem()
        .title('Rooms')
        .child(
          S.documentTypeList('roomSimplified')
            .title('All Your Rooms')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),

      // HERITAGE SITES
      S.listItem()
        .title('Heritage Sites')
        .child(
          S.documentTypeList('heritageSite')
            .title('Heritage & Explore Sites')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      S.divider(),

      // PAGES
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Page Content')
            .items([
              S.listItem()
                .title('Rooms Page')
                .child(
                  S.document()
                    .schemaType('roomsPage')
                    .documentId('roomsPage')
                    .title('Rooms Page Header')
                ),
              S.listItem()
                .title('Explore Page')
                .child(
                  S.document()
                    .schemaType('explorePage')
                    .documentId('explorePage')
                    .title('Explore Page Header')
                ),
              S.listItem()
                .title('About Page')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('About Page Content')
                ),
            ])
        ),

      S.divider(),

      // SETTINGS
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Contact & Branding')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Contact Info & Branding')
                ),
              S.listItem()
                .title('Navigation Menu')
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation')
                    .title('Header Navigation Links')
                ),
              S.listItem()
                .title('Footer')
                .child(
                  S.document()
                    .schemaType('footer')
                    .documentId('footer')
                    .title('Footer Content')
                ),
            ])
        ),
    ]);
