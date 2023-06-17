import { GraphQLError } from 'graphql';

import { authenticateWithDeviceByUserId } from './resolvers';
import { builder } from '../builder';

builder.prismaObject('NanoleafAuthToken', {
  fields: (t) => ({
    id: t.exposeID('id'),
    token: t.exposeString('token'),
    deviceId: t.exposeString('deviceId'),
    device: t.relation('device'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

const AuthenticateWithDeviceInput = builder.inputType(
  'AuthenticateWithDeviceInput',
  {
    fields: (t) => ({
      ip: t.string({ required: true }),
      name: t.string({ required: true }),
      mac: t.string({ required: true }),
      shouldSyncPalettes: t.boolean({ required: false }),
    }),
  },
);

builder.mutationField('authenticateWithDeviceByUserId', (t) =>
  t.prismaField({
    type: 'Device',
    args: {
      input: t.arg({ type: AuthenticateWithDeviceInput, required: true }),
    },
    resolve: async (query, parent, args, ctx) => {
      const { user } = await ctx;
      const { shouldSyncPalettes, ip, name, mac } = args.input;

      const device = {
        ip,
        name,
        mac,
      };

      if (!user) {
        // TODO: Add logging for full error
        throw new GraphQLError(
          'You have to be logged in to perform this action',
        );
      }

      const newDevice = await authenticateWithDeviceByUserId({
        device,
        shouldSyncPalettes: shouldSyncPalettes || false,
        user,
      });

      return newDevice;
    },
  }),
);
