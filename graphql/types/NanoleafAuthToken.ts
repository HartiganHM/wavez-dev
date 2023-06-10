import { builder } from '../builder';

builder.prismaObject('NanoleafAuthToken', {
  fields: (t) => ({
    id: t.exposeID('id'),
    token: t.exposeString('token'),
    deviceId: t.exposeID('deviceId'),
    device: t.relation('device'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
