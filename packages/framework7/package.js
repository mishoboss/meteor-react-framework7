Package.describe({
  name: 'mishoboss:framework7',
  version: '1.3.2',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.addFiles('framework7/dist/js/framework7.js', 'client');
  api.addAssets('framework7/dist/css/framework7.ios.min.css', 'client', {isAsset: true});
  api.addAssets('framework7/dist/css/framework7.ios.colors.min.css', 'client', {isAsset: true});
  api.addAssets('framework7/dist/css/framework7.ios.rtl.min.css', 'client', {isAsset: true});
  api.addAssets('framework7/dist/css/framework7.material.min.css', 'client', {isAsset: true});
  api.addAssets('framework7/dist/css/framework7.material.colors.min.css', 'client', {isAsset: true});
  api.addAssets('framework7/dist/css/framework7.material.rtl.min.css', 'client', {isAsset: true});
});

Package.onTest(function(api) {
  api.use('mishoboss:framework7');
});
