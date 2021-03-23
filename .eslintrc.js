const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
);

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ["airbnb", "react-app", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", prettierOptions],
    "react/jsx-filename-extension": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/img-redundant-alt": "off",
  },
};
