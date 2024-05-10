const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const hostname = 'https://coiboicuchay.social/';

const urls = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/boi-bai-52-la', changefreq: 'daily', priority: 0.8 },
  { url: '/boi-bai-tarot', changefreq: 'daily', priority: 0.8 },
  { url: '/boi-ngay-sinh', changefreq: 'daily', priority: 0.8 },
  { url: '/livestream', changefreq: 'daily', priority: 0.7 },
  { url: '/login', changefreq: 'daily', priority: 0.5 },
  { url: '/signup', changefreq: 'daily', priority: 0.5 },
  { url: '/tai-khoan', changefreq: 'daily', priority: 0.5 },
  { url: '/profilepage', changefreq: 'daily', priority: 0.5 },
  { url: '/logout', changefreq: 'daily', priority: 0.5 },
];

const sitemapStream = new SitemapStream({ hostname });

// Add URLs to the sitemap
urls.forEach((url) => {
  sitemapStream.write(url);
});

// End the sitemap stream
sitemapStream.end();

// Generate the sitemap as a string
streamToPromise(sitemapStream).then((sitemap) => {
  // Write sitemap to public directory
  fs.writeFileSync('./public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully.');
}).catch((error) => {
  console.error('Error generating sitemap:', error);
});