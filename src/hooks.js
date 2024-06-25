import { useGraphqlMutation, useGraphqlQuery } from "@openimis/fe-core";

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
