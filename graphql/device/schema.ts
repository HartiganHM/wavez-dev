import { builder } from 'graphql/builder';

import { copy } from './definitions';
import { discoverWifiDevices, discoverWifiDevicesByType } from './resolvers';

builder.prismaObject('Device', {
  fields: (t) => ({
    id: t.exposeID('id'),
    ip: t.exposeString('ip'),
    name: t.exposeString('name'),
    mac: t.exposeString('mac'),
    type: t.expose('type', { type: DeviceType }),
    userId: t.exposeString('userId'),
    user: t.relation('user'),
    palettes: t.relation('palettes'),
    nanoleafAuthTokenId: t.exposeString('nanoleafAuthTokenId', {
      nullable: true,
    }),
    nanoleafAuthToken: t.relation('nanoleafAuthToken'),
    nanoleafPropertiesId: t.exposeString('nanoleafPropertiesId', {
      nullable: true,
    }),
    nanoleafProperties: t.relation('nanoleafProperties'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

const DeviceType = builder.enumType('DeviceType', {
  values: ['NANOLEAF', 'LIFX', 'HUE'] as const,
});

builder.queryFields((t) => ({
  discoverWifiDevices: t.field({
    type: ['WifiDevice'],
    // resolve: async () => discoverWifiDevices(),
    resolve: async () => {
      const wifiDevices = await discoverWifiDevices();

      return wifiDevices;
    },
  }),
  discoverWifiDevicesByType: t.field({
    type: ['WifiDevice'],
    args: {
      type: t.arg({
        type: 'DeviceType',
        required: true,
      }),
    },
    resolve: async (parent, args) => {
      const wifiDevicesByType = await discoverWifiDevicesByType(args.type);

      return wifiDevicesByType;
    },
  }),
}));
