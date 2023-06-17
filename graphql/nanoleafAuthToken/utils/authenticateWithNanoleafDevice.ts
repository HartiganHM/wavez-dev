import { NanoleafAuthenticationResponse } from 'definitions/types';

import validateNanoleafResponse from './validateNanoleafResponse';
import { constants } from '../definitions';

const { endpoints } = constants;

const authenticateWithNanoleafDevice = async (
  ipAddress: string,
): Promise<string> => {
  try {
    const response = await fetch(endpoints.authenticate(ipAddress), {
      method: 'POST',
      redirect: 'follow',
    });

    validateNanoleafResponse(response, ipAddress);

    const { auth_token: authToken } =
      (await response.json()) as NanoleafAuthenticationResponse;
    console.log('🐸', authToken);

    return authToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default authenticateWithNanoleafDevice;
