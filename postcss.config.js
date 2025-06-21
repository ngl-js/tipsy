export default {
  plugins: {
    "@tailwindcss/postcss": {}, // Use @tailwindcss/postcss,
    autoprefixer: {
      overrideBrowserslist: ["safari >= 14", "last 2 versions", "> 1%"],
    },
  },
};
