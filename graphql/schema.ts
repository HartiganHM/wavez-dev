// graphql/schema.ts
import './types/AccessKey';
import './device/schema';
import './types/NanoleafAuthToken';
import './types/NanoleafProperties';
import './types/Palette';
import './types/User';

import { builder } from './builder';

export const schema = builder.toSchema();
