import { builder } from '../builder';

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
