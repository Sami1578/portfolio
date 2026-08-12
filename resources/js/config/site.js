/**
 * Site-wide, non-content configuration: nav structure, brand mark.
 * Separate from `data/` because this describes navigation/UI, not
 * something you'd expect an admin dashboard to edit.
 */
export const siteConfig = {
  brandName: 'SA.',
  navLinks: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Resources', href: '/resources' },
    { name: 'Blog', href: '/posts' },
    { name: 'Contact', href: '/#contact' },
  ],
  ctaLabel: 'Hire me',
};
