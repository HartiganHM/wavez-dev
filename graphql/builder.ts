// 1. Defines all the libraries and utilities that will be needed
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { DateResolver } from 'graphql-scalars';
import { IDevice } from 'local-devices';

import { createContext } from './context';
import prisma from '../lib/prisma';
import { DeviceType } from '../definitions/types';

// 2. Creates a new SchemaBuilder instance
export const builder = new SchemaBuilder<{
  // 3. Defines the static types that will be used in creating the GraphQL schema
  PrismaTypes: PrismaTypes;
  Context: ReturnType<typeof createContext>;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    WifiDevice: {
      Input: IDevice;
      Output: IDevice;
    };
    WifiDeviceType: {
      Input: DeviceType;
      Output: DeviceType;
    };
  };
}>({
  // 4.Defines options for the SchemaBuilder such as the plugins and
  // the Prisma Client instance that will be used
  plugins: [PrismaPlugin, SimpleObjectsPlugin],
  prisma: {
    client: prisma,
  },
});

// 5. Add custom scalar types
builder.addScalarType('DateTime', DateResolver, {});
builder.scalarType('WifiDeviceType', {
  serialize: (n) => n,
});

// 6. Creates a queryType with a query called ok that returns a boolean
builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});
