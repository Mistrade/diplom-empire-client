import * as Types from '../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AddNewSubjectMutationVariables = Types.Exact<{
  data: Types.AcademicSubjectInput;
}>;


export type AddNewSubjectMutation = { __typename?: 'Mutation', createAcademicSubject: { __typename?: 'AcademicSubject', title: string, description?: string | null | undefined } };


export const AddNewSubjectDocument = gql`
    mutation AddNewSubject($data: AcademicSubjectInput!) {
  createAcademicSubject(data: $data) {
    title
    description
  }
}
    `;
export type AddNewSubjectMutationFn = Apollo.MutationFunction<AddNewSubjectMutation, AddNewSubjectMutationVariables>;

/**
 * __useAddNewSubjectMutation__
 *
 * To run a mutation, you first call `useAddNewSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewSubjectMutation, { data, loading, error }] = useAddNewSubjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddNewSubjectMutation(baseOptions?: Apollo.MutationHookOptions<AddNewSubjectMutation, AddNewSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewSubjectMutation, AddNewSubjectMutationVariables>(AddNewSubjectDocument, options);
      }
export type AddNewSubjectMutationHookResult = ReturnType<typeof useAddNewSubjectMutation>;
export type AddNewSubjectMutationResult = Apollo.MutationResult<AddNewSubjectMutation>;
export type AddNewSubjectMutationOptions = Apollo.BaseMutationOptions<AddNewSubjectMutation, AddNewSubjectMutationVariables>;
export const namedOperations = {
  Mutation: {
    AddNewSubject: 'AddNewSubject'
  }
}