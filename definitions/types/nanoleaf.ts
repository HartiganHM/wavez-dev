export interface NanoleafAuthenticationResponse {
  auth_token: string;
}

export interface NanoleafPropertiesProps {
  firmwareVersion: string;
  name: string;
  model: string;
  serialNo: string;
  effects: NanoleafEffectsProps;
}

export interface NanoleafEffectsProps {
  select: string;
  effectsList: string[];
}

export interface NanoleafStateValueProps {
  value: string | boolean;
  min?: string;
  max?: string;
}

export interface NanoleafStateProps {
  on?: NanoleafStateValueProps;
  brightness?: NanoleafStateValueProps;
  hue?: NanoleafStateValueProps;
  sat?: NanoleafStateValueProps;
  ct?: NanoleafStateValueProps;
  colorMode?: string;
}

export interface NanoleafAllEffectsResponse {
  animations: NanoLeafAnimationResponse[];
}

export interface NanoLeafAnimationResponse {
  version: string;
  animName: string;
  animType: string;
  colorType: string;
  palette: NanoleafColorResponse[];
  pluginType: string;
  pluginUuid: string;
  pluginOptions?: NanoleafPluginOption[];
  hasOverlay: boolean;
}

export interface NanoleafPluginOption {
  name: string;
  value: number | string | boolean;
}

export interface NanoleafColorResponse {
  hue: number;
  saturation: number;
  brightness: number;
}
