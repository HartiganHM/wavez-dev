import find, { IDevice } from 'local-devices';

import { DeviceMacSubstringByType, DeviceType } from '../../definitions/types';

const findeDeviceByType = (device: IDevice, macSubstring: string) =>
  device.mac.toLocaleLowerCase().includes(macSubstring.toLocaleLowerCase());

export const discoverWifiDevices = async (): Promise<IDevice[]> => {
  try {
    const devices = await find();

    return devices;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const discoverWifiDevicesByType = async (
  type: DeviceType,
): Promise<IDevice[]> => {
  try {
    const devices = await discoverWifiDevices();

    const filteredDevices = devices.filter((device: IDevice) => {
      const match = findeDeviceByType(device, DeviceMacSubstringByType[type]);

      return match;
    });

    return filteredDevices;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
