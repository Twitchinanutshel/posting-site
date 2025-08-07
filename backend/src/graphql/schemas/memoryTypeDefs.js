const memoryTypeDefs = `
  type Query {
    getMemories: [Memory]
    getMemoryById(id: ID!): Memory
  }

  scalar Upload

  type Mutation {
    addMemory(
      title: String!
      description: String
      file: Upload!
      date: String!
    ): Memory
    deleteMemory(id: ID!): Boolean
  }

  type Memory {
    id: ID!
    title: String!
    description: String
    image_path: String!
    date: String!
    uploaded_at: String!
  }
  
  type Subscription {
    memoryChanged: Memory!
  }
`;

export default memoryTypeDefs;

