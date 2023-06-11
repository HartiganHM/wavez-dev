import { IDevice } from 'local-devices';
import { builder } from '../builder';

import { copy } from './definitions';
import { discoverWifiDevices, discoverWifiDevicesByType } from './resolvers';

builder.simpleObject('WifiDevice', {
  fields: (t) => ({
    ip: t.string({
      nullable: false,
    }),
    name: t.string({
      nullable: true,
    }),
    mac: t.string({
      nullable: true,
    }),
  }),
});

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
  wifiDevices: t.field({
    type: ['WifiDevice'],
    description: copy.descriptions.discoverWifiDevices,
    resolve: async () => {
      const wifiDevices = await discoverWifiDevices();

      return wifiDevices;
    },
  }),
  wifiDevicesByType: t.field({
    type: ['WifiDevice'],
    description: copy.descriptions.discoverWifiDevicesByType,
    args: {
      type: t.arg({
        type: 'WifiDeviceType',
        required: true,
      }),
    },
    resolve: async (parent, args) => {
      const wifiDevicesByType = await discoverWifiDevicesByType(args.type);

      return wifiDevicesByType;
    },
  }),
}));
