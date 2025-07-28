/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.trinetragames.in/',    
  generateRobotsTxt: true,                  
  exclude: ['/secret/*'],                   
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
}
