import { builder } from '../builder';

builder.prismaObject('NanoleafProperties', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    serialNo: t.exposeString('serialNo'),
    firmwareVersion: t.exposeString('firmwareVersion'),
    model: t.exposeString('model'),
    deviceId: t.exposeString('deviceId'),
    device: t.relation('device'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
