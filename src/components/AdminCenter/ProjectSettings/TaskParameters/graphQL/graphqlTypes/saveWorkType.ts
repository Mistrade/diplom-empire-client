import * as Types from '../../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SaveWorkTypeMutationVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type SaveWorkTypeMutation = { __typename?: 'Mutation', saveWorkType: { __typename?: 'WorkType', id: string, name: string, created: number } };


export const SaveWorkTypeDocument = gql`
    mutation SaveWorkType($name: String) {
  saveWorkType(name: $name) {
    id
    name
    created
  }
}
    `;
export type SaveWorkTypeMutationFn = Apollo.MutationFunction<SaveWorkTypeMutation, SaveWorkTypeMutationVariables>;

/**
 * __useSaveWorkTypeMutation__
 *
 * To run a mutation, you first call `useSaveWorkTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveWorkTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveWorkTypeMutation, { data, loading, error }] = useSaveWorkTypeMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSaveWorkTypeMutation(baseOptions?: Apollo.MutationHookOptions<SaveWorkTypeMutation, SaveWorkTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveWorkTypeMutation, SaveWorkTypeMutationVariables>(SaveWorkTypeDocument, options);
      }
export type SaveWorkTypeMutationHookResult = ReturnType<typeof useSaveWorkTypeMutation>;
export type SaveWorkTypeMutationResult = Apollo.MutationResult<SaveWorkTypeMutation>;
export type SaveWorkTypeMutationOptions = Apollo.BaseMutationOptions<SaveWorkTypeMutation, SaveWorkTypeMutationVariables>;
export const namedOperations = {
  Mutation: {
    SaveWorkType: 'SaveWorkType'
  }
}