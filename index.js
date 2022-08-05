const { ApolloServer, gql } = require('apollo-server');

// TODO - move typedefs to own file
const typeDefs = gql`
  type Activity {
    activity: String
    participants: Int
    price: Float
    link: String
    key: String
    accessibility: Float
  }

  type Query {
    activities: [Activity]
  }
`;

const mockActivities = [
    {
        activity: "Go somewhere",
        type: "random",
        participants: 1,
        price: 0.0,
        link: "random location",
        key: "12345",
        accessibility: 0.1
    },
    {
        activity: "Do something",
        type: "random",
        participants: 1,
        price: 0.0,
        link: "anywhere",
        key: "6789",
        accessibility: 0.4
    }
];

// TODO - move resolvers to own file
const resolvers = {
  Query: {
    activities: () => mockActivities,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});