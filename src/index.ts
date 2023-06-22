import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

const authors = [
  {
    name: 'Kate Chopin',
    age: 20
  },
  {
    name: 'Paul Auster',
    age: 13
  }
]

const books = [
  {
    id: '1',
    title: 'The Awakening',
    author: authors[0],
    price: 10
  },
  {
    id: '2',
    title: 'City of Glass',
    author: authors[1],
  },
];

let count = 0

const incrementCount = (number: 1) => {
  count += number
  return count
}



const typeDefs = `
  type Author {
    name: String!
    age: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    price: Int
  }
  # 
  
  type BookAndCount {
    count: Int!
    books: [Book!]!
  }
  

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    booksByAuthor(author: String!): [Book!]!
  }
  type Mutation {
    incrementCount(number: Int!): BookAndCount
  }
  
`;


const resolvers = {
  Query: { // GET
    books: () => books,
    book: (parent, { id }) => books.find(book => book.id === id),
    booksByAuthor: (parent, { author }) => books.filter(book => book.author === author)
  },
  Mutation: { // POST PUT DELETE
    incrementCount: (parent, { number }) => {
      const count = incrementCount(number)
      return { count: count, books: books}
    }
  }
  /*Mutation: {
    incrementCount: (parent, { number }) => incrementCount(number)
  }*/
};

const index = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(index, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);


