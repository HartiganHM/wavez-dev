import { GraphQLError } from 'graphql';

import { errors } from '../definitions';

const validateNanoleafResponse = (
  response: Response,
  ipAddress: string,
): void => {
  if (response.status === 401) {
    // TODO: Add logging for full error
    throw new GraphQLError(errors.unauthenticated.friendlyMessage);
  }

  if (response.status === 400) {
    // TODO: Add logging for full error
    throw new GraphQLError(errors.badJsonInput(ipAddress).friendlyMessage);
  }

  if (response.status === 404) {
    // TODO: Add logging for full error
    throw new GraphQLError(
      errors.deviceNotFoundAtIpAddress(ipAddress).friendlyMessage,
    );
  }

  if (response.status === 403) {
    // TODO: Add logging for full error
    throw new GraphQLError(errors.authTokenNotRegistered.friendlyMessage);
  }
};

export default validateNanoleafResponse;
