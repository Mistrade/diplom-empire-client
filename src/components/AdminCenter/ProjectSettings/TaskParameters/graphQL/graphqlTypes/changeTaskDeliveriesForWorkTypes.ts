import * as Types from '../../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ChangeTaskDeliveriesForWorkTypesMutationVariables = Types.Exact<{
  parent: Types.Scalars['ID'];
  data: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
  isDelete: Types.Scalars['Boolean'];
}>;


export type ChangeTaskDeliveriesForWorkTypesMutation = { __typename?: 'Mutation', changeTaskDeliveriesForWorkTypes: Array<{ __typename?: 'TaskDelivery', id: string, name: string, created: number } | null | undefined> };


export const ChangeTaskDeliveriesForWorkTypesDocument = gql`
    mutation ChangeTaskDeliveriesForWorkTypes($parent: ID!, $data: [ID!]!, $isDelete: Boolean!) {
  changeTaskDeliveriesForWorkTypes(
    parent: $parent
    data: $data
    isDelete: $isDelete
  ) {
    id
    name
    created
  }
}
    `;
export type ChangeTaskDeliveriesForWorkTypesMutationFn = Apollo.MutationFunction<ChangeTaskDeliveriesForWorkTypesMutation, ChangeTaskDeliveriesForWorkTypesMutationVariables>;

/**
 * __useChangeTaskDeliveriesForWorkTypesMutation__
 *
 * To run a mutation, you first call `useChangeTaskDeliveriesForWorkTypesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeTaskDeliveriesForWorkTypesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeTaskDeliveriesForWorkTypesMutation, { data, loading, error }] = useChangeTaskDeliveriesForWorkTypesMutation({
 *   variables: {
 *      parent: // value for 'parent'
 *      data: // value for 'data'
 *      isDelete: // value for 'isDelete'
 *   },
 * });
 */
export function useChangeTaskDeliveriesForWorkTypesMutation(baseOptions?: Apollo.MutationHookOptions<ChangeTaskDeliveriesForWorkTypesMutation, ChangeTaskDeliveriesForWorkTypesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeTaskDeliveriesForWorkTypesMutation, ChangeTaskDeliveriesForWorkTypesMutationVariables>(ChangeTaskDeliveriesForWorkTypesDocument, options);
      }
export type ChangeTaskDeliveriesForWorkTypesMutationHookResult = ReturnType<typeof useChangeTaskDeliveriesForWorkTypesMutation>;
export type ChangeTaskDeliveriesForWorkTypesMutationResult = Apollo.MutationResult<ChangeTaskDeliveriesForWorkTypesMutation>;
export type ChangeTaskDeliveriesForWorkTypesMutationOptions = Apollo.BaseMutationOptions<ChangeTaskDeliveriesForWorkTypesMutation, ChangeTaskDeliveriesForWorkTypesMutationVariables>;
export const namedOperations = {
  Mutation: {
    ChangeTaskDeliveriesForWorkTypes: 'ChangeTaskDeliveriesForWorkTypes'
  }
}