import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

type Task = {
  id: number;
  text: string;
  done: boolean;
};

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Task {
    id: ID!
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
    addTask(text: String): ActionTaskResponse,
    updateTask(id: ID!): ActionTaskResponse,
    deleteTask(id: ID!): ActionTaskResponse
  }

  type ActionTaskResponse {
    code: Int!
    success: Boolean!
    message: String!
    task: Task
  }
`;

let tasks = [];

function createId(tasks: Task[]): number {
  return tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
}

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    addTask: (_, { text }) => {
      const id = createId(tasks);
      try {
        tasks.push({ id, text, done: false });
        return {
          code: 200,
          success: true,
          message: 'Task added',
          task: { id, text, done: false },
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          task: null,
        };
      }
    },
    updateTask: (_, { id }) => {
      try {
        let updatedTask: Task;
        tasks = tasks.map((task) => {
          if (task.id === Number(id)) {
            task.done = !task.done;
            updatedTask = task;
          }
          return task;
        });
        updatedTask = tasks.find((task) => task.id === Number(id));
        return {
          code: 200,
          success: true,
          message: `Task ${updatedTask.text} updated`,
          task: updatedTask,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          task: null,
        };
      }
    },
    deleteTask: (_, { id }) => {
      const deletedTask = tasks.find((task) => task.id === Number(id));
      try {
        tasks = tasks.filter((task) => task.id !== Number(id));

        return {
          code: 200,
          success: true,
          message: `Task ${deletedTask.text} deleted`,
          task: deletedTask,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          task: null,
        };
      }
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
