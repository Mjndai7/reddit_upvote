const { SitemapStream, streamToPromise } = require('sitemap'); // Import the necessary modules
const { createWriteStream } = require('fs');
const { resolve } = require('path');

async function generateSitemap() {
  try {
    const links = [
      { url: '/', changefreq: 'weekly', priority: 1.0 }, // Home page
      { url: '/services', changefreq: 'monthly', priority: 0.8 }, // Services page
      { url: '/bots', changefreq: 'monthly', priority: 0.8 }, // Bots page
      { url: '/deals', changefreq: 'monthly', priority: 0.8 }, // Deals page
      { url: '/about', changefreq: 'monthly', priority: 0.8 }, // About page
      { url: '/contact-us', changefreq: 'monthly', priority: 0.8 }, // Contact page
      { url: '/botus-tube', changefreq: 'monthly', priority: 0.8 }, // Botus Tube page
      { url: '/terms', changefreq: 'monthly', priority: 0.8 }, // Terms page
      { url: '/privacy', changefreq: 'monthly', priority: 0.8 }, // Privacy page
    ];

    const stream = new SitemapStream({ hostname: 'https://www.botustech.com' }); // Create a sitemap stream with the base URL

    links.forEach((link) => {
      stream.write(link); // Write each link to the sitemap stream
    });
    stream.end(); // End the sitemap stream

    const sitemapXML = await streamToPromise(stream); // Convert the sitemap stream to a string

    const writeStream = createWriteStream(resolve(__dirname, '../public/sitemap.xml')); // Specify the path and filename for the sitemap.xml file
    writeStream.write(sitemapXML); // Write the sitemap XML to the file
    writeStream.end();

    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
