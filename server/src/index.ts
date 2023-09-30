import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Task {
    id: Int
    text: String
    done: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    tasks: [Task]
  }

  type Mutation {
    addTask(id: Int, text: String, done: Boolean): Task
  }
`;

const tasks = [
  {
    id: 1,
    text: 'read a book',
    done: false,
  },
  {
    id: 2,
    text: 'do some coding',
    done: true,
  },
];

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    addTask: (id, text, done) => {
      tasks.push({ id, text, done });
      return { id, text, done };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
