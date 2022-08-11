const base_config = {
  presets: [
    [
      "@babel/preset-react",
      { runtime: "automatic", importSource: "@emotion/react" },
    ],
  ],
  plugins: ["@emotion/babel-plugin", "add-react-displayname"],
};

module.exports = (api) => {
  if (api.env("test")) {
    // Change preset-env for node instead of browser
    return {
      ...base_config,
      presets: [
        ["@babel/preset-env", { targets: { node: "16" } }],
        [
          "@babel/preset-react",
          { runtime: "automatic", importSource: "@emotion/react" },
        ],
      ],
    };
  }
  return base_config;
};
