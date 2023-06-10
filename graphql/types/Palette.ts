import { builder } from '../builder';

builder.prismaObject('Palette', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    colors: t.exposeString('colors'),
    userId: t.exposeString('userId'),
    user: t.relation('user'),
    devices: t.relation('devices'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
