const express = require('express');
const cors = require('cors');
const consign = require('consign');

module.exports = function (app) {
  app = express();

  app.use(cors());

  app.use(express.json());

  consign()
    .include('controllers')
    .into(app);

  return app;
}

