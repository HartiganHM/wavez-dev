// graphql/builder.ts

// 1. Defines all the libraries and utilities that will be needed
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { DateResolver } from 'graphql-scalars';

import prisma from '../lib/prisma';

// 2. Creates a new SchemaBuilder instance
export const builder = new SchemaBuilder<{
  // 3. Defines the static types that will be used in creating the GraphQL schema
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  }
}>({
  // 4.Defines options for the SchemaBuilder such as the plugins and
  // the Prisma Client instance that will be used
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

// 5. Add custom scalar types
builder.addScalarType('DateTime', DateResolver, {});

// 6. Creates a queryType with a query called ok that returns a boolean
builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});
