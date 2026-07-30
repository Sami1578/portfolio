import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import ContactFab from './layout/ContactFab';

export default function Layout({ children, title = 'Portfolio', profile, whatsapp }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </Head>
      <div className="min-h-screen bg-bg">
        <Navbar profile={profile} />
        <main className="relative">{children}</main>
        <Footer profile={profile} />
        <ContactFab whatsapp={whatsapp}/>
      </div>
    </>
  );
}
