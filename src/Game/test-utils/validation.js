import { testInvalidPlayerError } from "../../test-utils/player";
import { testIsNotAnArrayOfAtLeast2ElementsError } from "../../test-utils/validation";

export const testInvalidPlayersListError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnArrayOfAtLeast2ElementsError(
    argumentName,
    callback,
    errorMessagesObj
  );

  testInvalidPlayerError(
    "player",
    (value) => callback([value, value]),
    errorMessagesObj.player
  );
};
