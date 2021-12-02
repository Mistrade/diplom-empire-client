import * as Types from '../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type DeleteSubSubjectMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteSubSubjectMutation = { __typename?: 'Mutation', deleteSubSubject?: { __typename?: 'Result', status?: boolean | null | undefined, message?: string | null | undefined } | null | undefined };


export const DeleteSubSubjectDocument = gql`
    mutation DeleteSubSubject($id: ID!) {
  deleteSubSubject(id: $id) {
    status
    message
  }
}
    `;
export type DeleteSubSubjectMutationFn = Apollo.MutationFunction<DeleteSubSubjectMutation, DeleteSubSubjectMutationVariables>;

/**
 * __useDeleteSubSubjectMutation__
 *
 * To run a mutation, you first call `useDeleteSubSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubSubjectMutation, { data, loading, error }] = useDeleteSubSubjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSubSubjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubSubjectMutation, DeleteSubSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubSubjectMutation, DeleteSubSubjectMutationVariables>(DeleteSubSubjectDocument, options);
      }
export type DeleteSubSubjectMutationHookResult = ReturnType<typeof useDeleteSubSubjectMutation>;
export type DeleteSubSubjectMutationResult = Apollo.MutationResult<DeleteSubSubjectMutation>;
export type DeleteSubSubjectMutationOptions = Apollo.BaseMutationOptions<DeleteSubSubjectMutation, DeleteSubSubjectMutationVariables>;
export const namedOperations = {
  Mutation: {
    DeleteSubSubject: 'DeleteSubSubject'
  }
}