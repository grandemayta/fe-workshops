const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['last 2 Chrome versions', 'safari >= 7']
      },
      exclude: ['transform-classes']
    }
  ]
];

module.exports = {
  presets,
  env: {
    test: {
      presets
    },
    prod: {
      plugins: ['transform-remove-console']
    }
  },
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime'
  ]
};
