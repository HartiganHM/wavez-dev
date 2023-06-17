import { gql } from '@apollo/client';

export const GET_WIFI_DEVICES_BY_TYPE = gql`
  query WifiDevicesByType($type: WifiDeviceType!) {
    wifiDevicesByType(type: $type) {
      ip
      name
      mac
    }
  }
`;

export const ADD_NEW_NANOLEAF_DEVICE = gql`
  mutation AddNewNanoleafDevice($input: AuthenticateWithDeviceInput!) {
    authenticateWithDeviceByUserId(input: $input) {
      name
    }
  }
`