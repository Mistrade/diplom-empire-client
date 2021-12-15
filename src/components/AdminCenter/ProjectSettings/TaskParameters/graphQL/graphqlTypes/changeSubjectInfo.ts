import * as Types from '../../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ChangeSubjectInfoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  title: Types.Scalars['String'];
}>;


export type ChangeSubjectInfoMutation = { __typename?: 'Mutation', changeSubject?: { __typename?: 'AcademicSubject', id: string, title: string } | null | undefined };


export const ChangeSubjectInfoDocument = gql`
    mutation ChangeSubjectInfo($id: ID!, $title: String!) {
  changeSubject(id: $id, title: $title) {
    id
    title
  }
}
    `;
export type ChangeSubjectInfoMutationFn = Apollo.MutationFunction<ChangeSubjectInfoMutation, ChangeSubjectInfoMutationVariables>;

/**
 * __useChangeSubjectInfoMutation__
 *
 * To run a mutation, you first call `useChangeSubjectInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeSubjectInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeSubjectInfoMutation, { data, loading, error }] = useChangeSubjectInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useChangeSubjectInfoMutation(baseOptions?: Apollo.MutationHookOptions<ChangeSubjectInfoMutation, ChangeSubjectInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeSubjectInfoMutation, ChangeSubjectInfoMutationVariables>(ChangeSubjectInfoDocument, options);
      }
export type ChangeSubjectInfoMutationHookResult = ReturnType<typeof useChangeSubjectInfoMutation>;
export type ChangeSubjectInfoMutationResult = Apollo.MutationResult<ChangeSubjectInfoMutation>;
export type ChangeSubjectInfoMutationOptions = Apollo.BaseMutationOptions<ChangeSubjectInfoMutation, ChangeSubjectInfoMutationVariables>;
export const namedOperations = {
  Mutation: {
    ChangeSubjectInfo: 'ChangeSubjectInfo'
  }
}