module.exports = function(eleventyConfig) {
  
  // 1. Tells Eleventy to read all your separate article files from the /blogs folder and sort them
  eleventyConfig.addCollection("blogs", function(collectionApi) {
      return collectionApi.getFilteredByGlob("blogs/*.html").sort((a, b) => {
          // If both have explicit publish dates, sort newest first
          if (a.data.publishDate && b.data.publishDate) {
              return new Date(b.data.publishDate) - new Date(a.data.publishDate);
          }
          // If only 'a' has a date, 'a' goes to the top
          if (a.data.publishDate) return -1;
          // If only 'b' has a date, 'b' goes to the top
          if (b.data.publishDate) return 1;
          
          // If neither has a date, keep their original structural/file placement untouched
          return 0;
      });
  });

  // 2. Safely copies your images, styles, and asset folders into your live website
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("images");
  //eleventyConfig.addPassthroughCopy("blogs"); // Added for your blog assets
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy(".well-known");
  eleventyConfig.addPassthroughCopy("sw.js");      // Added for Service Worker
  eleventyConfig.addPassthroughCopy("manifest.json"); // Added for PWA
  eleventyConfig.addPassthroughCopy("robots.txt"); // Good practice to include

  // 3. Setup your root folder structures and layout engines
  return {
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    
    dir: {
      input: ".",            
      output: "_site",       
      includes: "_includes"  
    }
  }
};