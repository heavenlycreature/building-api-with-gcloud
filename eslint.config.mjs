import globals from "globals";
import daStyle from "eslint-config-dicodingacademy";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  daStyle,
];
