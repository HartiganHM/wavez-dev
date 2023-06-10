import { builder } from '../builder';

builder.prismaObject('AccessKey', {
  fields: (t) => ({
    id: t.exposeID('id'),
    key: t.exposeString('key'),
    userId: t.exposeID('userId'),
    email: t.exposeString('email'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    expireAt: t.expose('expireAt', { type: 'DateTime' }),
  }),
});
