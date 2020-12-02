module.exports = {
  wrapper: './wrapper.tsx',
  onCreateBabelConfig: ({ baseConfig }) => {
    baseConfig.presets.push('@babel/preset-typescript');

    return baseConfig;
  },
  onCreateWebpackConfig: ({ mode, baseConfig }) => {
    if (mode === 'production') {
      baseConfig.externals['@sevone/insight-connect'] = {
        root: 'insightConnect',
        commonjs2: '@sevone/insight-connect',
        commonjs: '@sevone/insight-connect',
        amd: '@sevone/insight-connect'
      };
    }

    return baseConfig;
  }
};
