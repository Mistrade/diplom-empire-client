import * as Types from '../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AcademicSubjectsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AcademicSubjectsListQuery = { __typename?: 'Query', academicSubjects?: Array<{ __typename?: 'AcademicSubject', title: string, description?: string | null | undefined, id: string }> | null | undefined };


export const AcademicSubjectsListDocument = gql`
    query AcademicSubjectsList {
  academicSubjects {
    title
    description
    id
  }
}
    `;

/**
 * __useAcademicSubjectsListQuery__
 *
 * To run a query within a React component, call `useAcademicSubjectsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAcademicSubjectsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAcademicSubjectsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useAcademicSubjectsListQuery(baseOptions?: Apollo.QueryHookOptions<AcademicSubjectsListQuery, AcademicSubjectsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AcademicSubjectsListQuery, AcademicSubjectsListQueryVariables>(AcademicSubjectsListDocument, options);
      }
export function useAcademicSubjectsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AcademicSubjectsListQuery, AcademicSubjectsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AcademicSubjectsListQuery, AcademicSubjectsListQueryVariables>(AcademicSubjectsListDocument, options);
        }
export type AcademicSubjectsListQueryHookResult = ReturnType<typeof useAcademicSubjectsListQuery>;
export type AcademicSubjectsListLazyQueryHookResult = ReturnType<typeof useAcademicSubjectsListLazyQuery>;
export type AcademicSubjectsListQueryResult = Apollo.QueryResult<AcademicSubjectsListQuery, AcademicSubjectsListQueryVariables>;
export const namedOperations = {
  Query: {
    AcademicSubjectsList: 'AcademicSubjectsList'
  }
}