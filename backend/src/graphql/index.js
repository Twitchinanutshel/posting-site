import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';

import accessTypeDefs from './schemas/accessTypeDefs.js';
import accessResolvers from './resolvers/accessResolvers.js';
import memoryTypeDefs from './schemas/memoryTypeDefs.js';
import memoryResolvers from './resolvers/memoryResolvers.js';



export const typeDefs = mergeTypeDefs([accessTypeDefs, memoryTypeDefs]);
export const resolvers = mergeResolvers([accessResolvers, memoryResolvers]);

