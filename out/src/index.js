"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
// const resolvers = {
//   Query: {
//     info: () => 'This is a video game API',
//   },
// }
const port = process.env.PORT || 4000;
const server = new apollo_server_1.ApolloServer({
    resolvers: schema_1.resolvers,
    typeDefs: schema_1.typeDefs,
}).listen({ port }, () => console.log(`Server listening on ${port}`));
//# sourceMappingURL=index.js.map