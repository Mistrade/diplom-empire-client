import * as Types from '../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AddNewSubSubjectMutationVariables = Types.Exact<{
  data: Types.SubSubjectInput;
}>;


export type AddNewSubSubjectMutation = { __typename?: 'Mutation', createNewSubSubject: { __typename?: 'SubSubject', title: string, description?: string | null | undefined, parentID?: string | null | undefined } };


export const AddNewSubSubjectDocument = gql`
    mutation AddNewSubSubject($data: SubSubjectInput!) {
  createNewSubSubject(data: $data) {
    title
    description
    parentID
  }
}
    `;
export type AddNewSubSubjectMutationFn = Apollo.MutationFunction<AddNewSubSubjectMutation, AddNewSubSubjectMutationVariables>;

/**
 * __useAddNewSubSubjectMutation__
 *
 * To run a mutation, you first call `useAddNewSubSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewSubSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewSubSubjectMutation, { data, loading, error }] = useAddNewSubSubjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddNewSubSubjectMutation(baseOptions?: Apollo.MutationHookOptions<AddNewSubSubjectMutation, AddNewSubSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewSubSubjectMutation, AddNewSubSubjectMutationVariables>(AddNewSubSubjectDocument, options);
      }
export type AddNewSubSubjectMutationHookResult = ReturnType<typeof useAddNewSubSubjectMutation>;
export type AddNewSubSubjectMutationResult = Apollo.MutationResult<AddNewSubSubjectMutation>;
export type AddNewSubSubjectMutationOptions = Apollo.BaseMutationOptions<AddNewSubSubjectMutation, AddNewSubSubjectMutationVariables>;
export const namedOperations = {
  Mutation: {
    AddNewSubSubject: 'AddNewSubSubject'
  }
}