import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[SEO Prerender] dist/index.html not found! Please run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');

const SOCIAL_BANNER = 'https://jantalive.in/wp-content/uploads/2026/10/Iconic-Creation-Awards-Gala.jpg';
const BASE_URL = 'https://registration.jantalive.in';

const ROUTES_CONFIG = [
  {
    route: '/about',
    title: 'About Us | Iconic Creation Of God — Mr, Miss & Mrs',
    description: 'Learn about Iconic Creation Of God, presented by Janta Live News and Deven Jha Productions under the visionary direction of Deven Jha and Ritu Jha.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${BASE_URL}/about#webpage`,
      url: `${BASE_URL}/about`,
      name: 'About Us | Iconic Creation Of God',
      description: 'Learn about Iconic Creation Of God, presented by Janta Live News and Deven Jha Productions under the visionary direction of Deven Jha and Ritu Jha.',
      publisher: {
        '@type': 'Organization',
        name: 'Iconic Creation Of God',
        url: BASE_URL,
      },
    },
  },
  {
    route: '/event',
    title: 'Event & Activities | Iconic Creation Of God 2026',
    description: 'Discover the 4 key activities at Iconic Creation Of God: Luxury Makeup Artistry Seminar, Makeup Competition, Fashion Runway Ramp Walk, and Celebrity Grand Award Show.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      '@id': `${BASE_URL}/event#event`,
      name: 'Iconic Creation Of God — Mr / Miss / Mrs',
      description: 'Four grand pillars: Makeup Artistry Seminar, Championship, Fashion Runway Ramp Walk, and Celebrity Grand Award Show with Jivitha Sharma.',
      startDate: '2026-12-21T10:00:00+05:30',
      endDate: '2026-12-21T18:00:00+05:30',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Delhi / NCR',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Delhi / NCR',
          addressRegion: 'Delhi',
          addressCountry: 'IN',
        },
      },
      image: [SOCIAL_BANNER],
      organizer: [
        {
          '@type': 'Organization',
          name: 'Janta Live News',
          url: 'https://jantalive.in/',
        },
        {
          '@type': 'Organization',
          name: 'Deven Jha Productions',
          url: 'https://jantalive.in/',
        },
      ],
      performer: {
        '@type': 'Person',
        name: 'Jivitha Sharma',
        jobTitle: 'Bollywood Actress & Celebrity Guest',
      },
    },
  },
  {
    route: '/register',
    title: 'Register Online | Iconic Creation Of God Auditions & Passes',
    description: 'Official registration portal for Iconic Creation Of God Mr, Miss & Mrs. Submit your candidate nomination, seminar passes, and awards entry online.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_URL}/register#webpage`,
      url: `${BASE_URL}/register`,
      name: 'Official Registration Portal | Iconic Creation Of God',
      description: 'Official registration portal for Iconic Creation Of God Mr, Miss & Mrs. Submit your candidate nomination, seminar passes, and awards entry online.',
      offers: [
        {
          '@type': 'Offer',
          name: 'Makeup Artistry Seminar Pass',
          price: '1500',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Grand Award Show Pass',
          price: '3000',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Makeup Competition Nomination',
          price: '3500',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'VIP Privileged Guest Pass',
          price: '5000',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      ],
    },
  },
  {
    route: '/verify-certificate',
    title: 'Verify Certificate | Iconic Creation Of God Official Ledger',
    description: 'Authenticate official candidate, seminar, and participation certificates issued by Iconic Creation Of God & Janta Live News on the live digital ledger.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_URL}/verify-certificate#webpage`,
      url: `${BASE_URL}/verify-certificate`,
      name: 'Official Certificate Verification Ledger | Iconic Creation Of God',
      description: 'Authenticate official candidate, seminar, and participation certificates issued by Iconic Creation Of God & Janta Live News on the live digital ledger.',
    },
  },
  {
    route: '/verify-award',
    title: 'Verify Award & Trophy | Iconic Creation Of God Honors Registry',
    description: 'Verify official awards, trophies, and felicitations conferred at Iconic Creation Of God with authentic citation records and celebrity endorsements.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_URL}/verify-award#webpage`,
      url: `${BASE_URL}/verify-award`,
      name: 'Official Award & Trophy Verification Ledger | Iconic Creation Of God',
      description: 'Verify official awards, trophies, and felicitations conferred at Iconic Creation Of God with authentic citation records and celebrity endorsements.',
    },
  },
  {
    route: '/gallery',
    title: 'Official Media Gallery | Iconic Creation Of God Runway & Gala',
    description: 'Browse high-resolution photographs, runway moments, celebrity appearances, and award ceremony highlights from Iconic Creation Of God events.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      '@id': `${BASE_URL}/gallery#gallery`,
      url: `${BASE_URL}/gallery`,
      name: 'Official Media Gallery | Iconic Creation Of God',
      description: 'Browse high-resolution photographs, runway moments, celebrity appearances, and award ceremony highlights from Iconic Creation Of God events.',
    },
  },
  {
    route: '/faq',
    title: 'Frequently Asked Questions | Iconic Creation Of God Pageant & Awards',
    description: 'Find answers about audition criteria, category guidelines, registration fees, seminar schedules, venue access, and certificate verification.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/faq#faq`,
      url: `${BASE_URL}/faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who can register for the Mr, Miss, and Mrs categories?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The pageant welcomes candidates across India. Mr category is open to male contenders; Miss is open to unmarried female contenders; Mrs celebrates married, widowed, or divorced women.',
          },
        },
        {
          '@type': 'Question',
          name: 'When and where will the event take place?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The event is scheduled for 21 December 2026 in the National Capital Region (Delhi / NCR) from 10:00 AM to 6:00 PM IST.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is the Celebrity Guest presenting the awards?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Acclaimed Bollywood actress Jivitha Sharma is the distinguished Guest of Honour conferring awards and sashes.',
          },
        },
      ],
    },
  },
  {
    route: '/contact',
    title: 'Contact Us | Iconic Creation Of God Secretariat Desk',
    description: 'Get in touch with the Iconic Creation Of God organizing committee for audition queries, sponsorship partnerships, and media accreditations.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${BASE_URL}/contact#contact`,
      url: `${BASE_URL}/contact`,
      name: 'Contact Secretariat Desk | Iconic Creation Of God',
      description: 'Get in touch with the Iconic Creation Of God organizing committee for audition queries, sponsorship partnerships, and media accreditations.',
    },
  },
  {
    route: '/privacy-policy',
    title: 'Privacy Policy | Iconic Creation Of God',
    description: 'Read our privacy policy regarding candidate data collection, audition portfolios, transaction receipts, and digital verification records.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_URL}/privacy-policy#webpage`,
      url: `${BASE_URL}/privacy-policy`,
      name: 'Privacy Policy | Iconic Creation Of God',
      description: 'Read our privacy policy regarding candidate data collection, audition portfolios, transaction receipts, and digital verification records.',
    },
  },
  {
    route: '/terms',
    title: 'Terms & Conditions | Iconic Creation Of God',
    description: 'Review the official terms, candidate code of conduct, registration guidelines, and event policies for Iconic Creation Of God.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_URL}/terms#webpage`,
      url: `${BASE_URL}/terms`,
      name: 'Terms & Conditions | Iconic Creation Of God',
      description: 'Review the official terms, candidate code of conduct, registration guidelines, and event policies for Iconic Creation Of God.',
    },
  },
];

console.log('[SEO Prerender] Generating crawler-optimized static pages...');

for (const config of ROUTES_CONFIG) {
  const pageUrl = `${BASE_URL}${config.route}`;
  let html = templateHtml;

  // 1. Title replacement
  html = html.replace(/<title>.*?<\/title>/s, `<title>${config.title}</title>`);

  // 2. Meta description replacement
  html = html.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${config.description}" />`
  );

  // 3. Canonical link replacement
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/s,
    `<link rel="canonical" href="${pageUrl}" />`
  );

  // 4. Open Graph replacements
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/s,
    `<meta property="og:title" content="${config.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/s,
    `<meta property="og:description" content="${config.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/s,
    `<meta property="og:url" content="${pageUrl}" />`
  );

  // 5. Twitter card replacements
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/s,
    `<meta name="twitter:title" content="${config.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/s,
    `<meta name="twitter:description" content="${config.description}" />`
  );

  // 6. JSON-LD replacement
  if (config.schema) {
    const jsonLdString = JSON.stringify(config.schema, null, 2);
    html = html.replace(
      /<script type="application\/ld\+json">.*?<\/script>/s,
      `<script type="application/ld+json">\n${jsonLdString}\n    </script>`
    );
  }

  // Create directory (e.g., dist/about)
  const routeSubdir = path.join(distDir, config.route.slice(1));
  if (!fs.existsSync(routeSubdir)) {
    fs.mkdirSync(routeSubdir, { recursive: true });
  }

  // Write dist/<route>/index.html
  const indexPath = path.join(routeSubdir, 'index.html');
  fs.writeFileSync(indexPath, html, 'utf8');

  // Also write dist/<route>.html for non-trailing slash edge servers
  const cleanHtmlPath = path.join(distDir, `${config.route.slice(1)}.html`);
  fs.writeFileSync(cleanHtmlPath, html, 'utf8');

  console.log(`[SEO Prerender] Generated: ${config.route} -> ${path.relative(projectRoot, indexPath)} & ${path.relative(projectRoot, cleanHtmlPath)}`);
}

console.log('[SEO Prerender] Successfully generated all static SEO pages for crawlers!');
