const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');

const boredURL = 'https://www.boredapi.com/api/activity';

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
    getActivity: Activity
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
    getActivity: async (_, __, { dataSources }) => dataSources.boredAPI.getActivity(),
  },
};

class BoredAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = boredURL;
    }

    async getActivity() {
        return this.get('');
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    dataSources: () => {
        return {
            boredAPI: new BoredAPI(),
        };
    },
});

// bypassing expired ssl certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});