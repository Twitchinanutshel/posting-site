import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';
import userTypeDefs from './schemas/userTypeDefs.js';
import userResolvers from './resolvers/userResolvers.js';

export const typeDefs = mergeTypeDefs([userTypeDefs]);
export const resolvers = mergeResolvers([userResolvers]);
