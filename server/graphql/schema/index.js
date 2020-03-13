const buildSchema = require("graphql").buildSchema;

const schema = buildSchema(`
  scalar Upload
  type File {
    name: String
    path: String
    mimetype: String
  }
  type Application {
    id: ID!
    name: String!
    email: String!
    phone: String!
    address: String!
    zipcode: String!
    document: File
  }
  input ApplicationInput {
    name: String!
    email: String!
    phone: String!
    address: String!
    zipcode: String!
    file: Upload
  }
  type Query {
    applications: [Application!]
  }
  type Mutation {
    submitApplication(input: ApplicationInput): Application
  }
  schema {
    query: Query
    mutation: Mutation
  } 
`);

module.exports = schema;
