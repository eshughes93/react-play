/*
Webpack (here at least) is using "loaders".
The loaders look for specific files (we are looking for .js and .hbs files).
Then the loaders pass the files to the appropriate modules.

These modules will convert what we need to simple javascript,
which will then be placed in our build file.

index.html is using app.js.
app.js is generated under build/ using webpack.

to build your webpack:
npm run build // runs our npm build scripts

*/
module.exports = {
  "entry": ["babel/polyfill", "./app/app.js"],
  "output": {
    "publicPath": "/",
    "filename": "build/generated.js"
  },
  "devtool": "source-map",
  "debug": true,
  "module": {
    "loaders": [
      {test: /\.js$/, loader: "babel?optional[]=runtime&stage=0"},
      {test: /\.hbs$/, loader: "handlebars"}
    ]
  }
};
