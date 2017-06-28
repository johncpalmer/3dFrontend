const express = require('express')
var webpack = require('webpack');  
var path = require('path');
var webpackDevMiddleWare = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack-production.config');

const app = express(),
    DIST_DIR = path.join(__dirname, "dist"),
    HTML_FILE = path.resolve(__dirname, "index.html"),
    isDevelopment = process.env.NODE_ENV !== "production",
    DEFAULT_PORT  = 3000,
    port = process.env.PORT || DEFAULT_PORT,
    compiler = webpack(config);

app.set("port", process.env.PORT || DEFAULT_PORT);
console.log(process.env);

if (isDevelopment) {
    app.use(require('webpack-dev-middleware')(compiler, {
        lazy: false,
        noInfo: true,
        publicPath: config.output.publicPath,
        quiet: false,
    }));
    
    console.log('Enabling Webpack Hot Module Replacement (HMR).');
    app.use(require('webpack-hot-middleware')(compiler));

    app.get('/', function(req, res) {
    	console.log(req.url);
    	res.sendFile(path.resolve(__dirname, 'index.html'));
    });
} else {
    app.use(express.static("dist"));
    console.log("PRODUCTION");

    app.get('/', function(req, res) {
        console.log(req.url);
        res.sendFile(HTML_FILE);
    });
}

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})