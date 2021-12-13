import * as Types from '../../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SaveTaskDeliveryObjectMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type SaveTaskDeliveryObjectMutation = { __typename?: 'Mutation', saveTaskDeliveryObject?: boolean | null | undefined };


export const SaveTaskDeliveryObjectDocument = gql`
    mutation SaveTaskDeliveryObject($name: String!) {
  saveTaskDeliveryObject(name: $name)
}
    `;
export type SaveTaskDeliveryObjectMutationFn = Apollo.MutationFunction<SaveTaskDeliveryObjectMutation, SaveTaskDeliveryObjectMutationVariables>;

/**
 * __useSaveTaskDeliveryObjectMutation__
 *
 * To run a mutation, you first call `useSaveTaskDeliveryObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveTaskDeliveryObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveTaskDeliveryObjectMutation, { data, loading, error }] = useSaveTaskDeliveryObjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSaveTaskDeliveryObjectMutation(baseOptions?: Apollo.MutationHookOptions<SaveTaskDeliveryObjectMutation, SaveTaskDeliveryObjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveTaskDeliveryObjectMutation, SaveTaskDeliveryObjectMutationVariables>(SaveTaskDeliveryObjectDocument, options);
      }
export type SaveTaskDeliveryObjectMutationHookResult = ReturnType<typeof useSaveTaskDeliveryObjectMutation>;
export type SaveTaskDeliveryObjectMutationResult = Apollo.MutationResult<SaveTaskDeliveryObjectMutation>;
export type SaveTaskDeliveryObjectMutationOptions = Apollo.BaseMutationOptions<SaveTaskDeliveryObjectMutation, SaveTaskDeliveryObjectMutationVariables>;
export const namedOperations = {
  Mutation: {
    SaveTaskDeliveryObject: 'SaveTaskDeliveryObject'
  }
}