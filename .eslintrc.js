module.exports = {
  extends: "eslint-config-pyroarsonist",
  settings: {
    "import/resolver": {
      "eslint-import-resolver-custom-alias": {
        alias: {
          "~": "./src",
        },
      },
    },
  },
};
