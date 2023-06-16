import { DeviceType } from '@prisma/client';

export default [
  {
    ip: '192.168.50.223',
    name: 'HD Twinkle Left',
    mac: '00:55:da:5a:60:0f',
    type: DeviceType.NANOLEAF,
  },
  {
    ip: '192.168.50.171',
    name: 'HD Twinkle Right',
    mac: '00:55:da:59:4b:fd',
    type: DeviceType.NANOLEAF,
  },
];
