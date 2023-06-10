export interface WifiDevice {
  id: string;
  mac: string;
  name: string;
}

export enum DeviceType {
  NANOLEAF = 'NANOLEAF',
  LIFX = 'LIFX',
  HUE = 'HUE',
}

export enum DeviceMacSubstringByType {
  NANOLEAF = '02:55:da',
  LIFX = 'd0:73:d5',
  HUE = 'ECB5',
}
