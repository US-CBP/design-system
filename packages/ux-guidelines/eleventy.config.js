module.exports = function(eleventyConfig) {
  // Return your Object options:
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    }
  }
};