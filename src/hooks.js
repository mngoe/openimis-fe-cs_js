import { useGraphqlMutation, useGraphqlQuery } from "@openimis/fe-core";
import { useSelector, useDispatch } from "react-redux";

import {
  initialize,
} from "./actions";


export const useOverrideReportMutation = () => {
    const mutation = useGraphqlMutation(
        `
        mutation updateChequeStatus($chequeStatus: UpdateChequeStatusInput!) {
            updateChequeStatus(input: $chequeStatus) {
              clientMutationId
              internalId
            }
          }
  `,
        { onSuccess: (data) => data?.overrideReport }
    );

    return mutation;
};

// export const useAuthentication = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.core.user);
//   const isInitialized = useSelector((state) => state.core.isInitialized);
//   const refresh = async () => {
//     await dispatch(refreshAuthToken());
//   };

//   return {
//     user,
//     isAuthenticated: Boolean(user),
//     initialize: () => dispatch(initialize()),
//     isInitialized,
//     login: (credentials) => dispatch(login(credentials)),
//   };
// };
