module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/main.css"],
  output: "_site/assets/css/",
  safelist: {
    standard: [/^col-/, /^row/, /^container/, /^modal/, /^carousel/, /^fade/, /^show/, /^active/, /^d-/, /^bg-/, /^text-/, /^btn/],
    deep: [/^highlight/, /^language-/],
  },
};
