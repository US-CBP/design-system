module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "../../node_modules/@cbpds/vanilla/dist/style.css": "assets/cbpds-vanilla.css"
  })
  
  // Return your Object options:
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    }
  }
};