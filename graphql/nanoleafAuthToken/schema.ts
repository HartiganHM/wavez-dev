// import { authenticateWithDeviceByUserId } from './resolvers';
// import { builder } from '../builder';
// 
// builder.prismaObject('NanoleafAuthToken', {
//   fields: (t) => ({
//     id: t.exposeID('id'),
//     token: t.exposeString('token'),
//     deviceId: t.exposeString('deviceId'),
//     device: t.relation('device'),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//   }),
// });
// 
// const AuthenticateWithDeviceInput = builder.inputType(
//   'AuthenticateWithDeviceInput',
//   {
//     fields: (t) => ({
//       ip: t.string({ required: true }),
//       name: t.string({ required: true }),
//       mac: t.string({ required: true }),
//       shouldSyncPalettes: t.boolean({ required: false }),
//     }),
//   },
// );
// 
// builder.mutationFields((t) => ({
//   authenticateWithDeviceByUserId: t.field({
//     type: 'String',
//     args: {
//       input: t.arg({ type: AuthenticateWithDeviceInput, required: true }),
//     },
//     resolve: async (query, args, ctx) => {
//       const { user } = await ctx;
//       const { input } = args;
// 
//       if (!user) {
//         throw new Error('You have to be logged in to perform this action');
//       }
// 
//       const authToken = await authenticateWithDeviceByUserId({
//         input,
//         shouldSyncPalettes: input.shouldSyncPalettes,
//         user,
//       });
// 
//       return authToken;
//     },
//   }),
// }));
