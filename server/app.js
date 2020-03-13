const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
const config = require('./config');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

const app = express();
app.use(cors());


app.use(
  '/graphql', 
  graphqlUploadExpress({ maxFieldSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
  }
));

app.use('/', express.static(__dirname + '/public'));

const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log('Server is running on: ' + port);