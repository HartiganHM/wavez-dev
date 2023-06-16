import { User } from '@prisma/client';
import { IDevice } from 'local-devices';

export interface AuthenticateWithNanoleafDeviceArgs {
  device: IDevice;
  shouldSyncPalettes: boolean;
  user: User;
}
