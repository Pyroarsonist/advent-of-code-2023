module.exports = {
  extends: "eslint-config-pyroarsonist",
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src",
        rootPathPrefix: "~",
      },
    },
  },
};
