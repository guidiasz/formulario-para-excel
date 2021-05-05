const { MongoClient } = require('mongodb');

const URI = process.env.URI;
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;
