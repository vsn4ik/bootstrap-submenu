export default {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        exclude: [
          '@babel/plugin-transform-typeof-symbol'
        ]
      }
    ]
  ],
  plugins: [
    '@babel/proposal-object-rest-spread'
  ]
}
