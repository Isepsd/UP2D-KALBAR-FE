const compression = require('compression');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const { resolve } = require('path');

// Compress all HTTP responses
app.use(compression());

// MAIN
app.use(
  '/api/v1/main',
  createProxyMiddleware({
    target: 'http://173.249.19.105:8023/apd',
    changeOrigin: true,
    pathRewrite: {
      [`^/api/v1/main`]: '',
    },
  })
);

// UPLOAD
app.use(
  '/api/v1/upload',
  createProxyMiddleware({
    target: 'http://173.249.19.105:8051/api/v1',
    changeOrigin: true,
    pathRewrite: {
      [`^/api/v1/upload`]: '',
    },
  })
);

// CDN
app.use(
  '/media',
  createProxyMiddleware({
    target: 'http://173.249.19.105:8050/apd/',
    changeOrigin: true,
    pathRewrite: {
      [`^/media`]: '',
    },
  })
);

app.use(express.static('build'));

app.get('*', (req, res) => res.sendFile(resolve('build', 'index.html')));
app.listen(9011);
