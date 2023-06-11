import { gql } from '@apollo/client';

export const GET_WIFIF_DEVICES_BY_TYPE = gql`
  query WifiDevicesByType($type: WifiDeviceType!) {
    wifiDevicesByType(type: $type) {
      ip
      name
      mac
    }
  }
`;
