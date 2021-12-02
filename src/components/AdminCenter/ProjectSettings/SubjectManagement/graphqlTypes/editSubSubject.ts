import * as Types from '../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type EditSubSubjectMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  data: Types.SubSubjectInput;
}>;


export type EditSubSubjectMutation = { __typename?: 'Mutation', editSubSubject?: { __typename?: 'Result', status?: boolean | null | undefined, message?: string | null | undefined } | null | undefined };


export const EditSubSubjectDocument = gql`
    mutation EditSubSubject($id: ID!, $data: SubSubjectInput!) {
  editSubSubject(id: $id, data: $data) {
    status
    message
  }
}
    `;
export type EditSubSubjectMutationFn = Apollo.MutationFunction<EditSubSubjectMutation, EditSubSubjectMutationVariables>;

/**
 * __useEditSubSubjectMutation__
 *
 * To run a mutation, you first call `useEditSubSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSubSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSubSubjectMutation, { data, loading, error }] = useEditSubSubjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditSubSubjectMutation(baseOptions?: Apollo.MutationHookOptions<EditSubSubjectMutation, EditSubSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditSubSubjectMutation, EditSubSubjectMutationVariables>(EditSubSubjectDocument, options);
      }
export type EditSubSubjectMutationHookResult = ReturnType<typeof useEditSubSubjectMutation>;
export type EditSubSubjectMutationResult = Apollo.MutationResult<EditSubSubjectMutation>;
export type EditSubSubjectMutationOptions = Apollo.BaseMutationOptions<EditSubSubjectMutation, EditSubSubjectMutationVariables>;
export const namedOperations = {
  Mutation: {
    EditSubSubject: 'EditSubSubject'
  }
}