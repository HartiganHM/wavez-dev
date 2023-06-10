import { builder } from '../builder';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name'),
    devices: t.relation('devices'),
    palettes: t.relation('palettes'),
    role: t.expose('role', { type: Role }),
    invites: t.exposeInt('invites'),
    invitedById: t.exposeString('invitedById', { nullable: true }),
    invitedBy: t.relation('invitedBy'),
    invitedUserToUser: t.relation('invitedUserToUser'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

const Role = builder.enumType('Role', {
  values: ['ADMIN', 'SUPPORTER', 'ALPHA', 'BETA', 'BASIC'] as const,
});
