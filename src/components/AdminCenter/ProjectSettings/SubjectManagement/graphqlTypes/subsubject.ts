import * as Types from '../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SubSubjectsQueryVariables = Types.Exact<{
  parentID: Types.Scalars['ID'];
}>;


export type SubSubjectsQuery = { __typename?: 'Query', subSubjects?: Array<{ __typename?: 'SubSubject', title: string, id?: string | null | undefined, parentID?: string | null | undefined }> | null | undefined };


export const SubSubjectsDocument = gql`
    query SubSubjects($parentID: ID!) {
  subSubjects(parentID: $parentID) {
    title
    id
    parentID
  }
}
    `;

/**
 * __useSubSubjectsQuery__
 *
 * To run a query within a React component, call `useSubSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubSubjectsQuery({
 *   variables: {
 *      parentID: // value for 'parentID'
 *   },
 * });
 */
export function useSubSubjectsQuery(baseOptions: Apollo.QueryHookOptions<SubSubjectsQuery, SubSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubSubjectsQuery, SubSubjectsQueryVariables>(SubSubjectsDocument, options);
      }
export function useSubSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubSubjectsQuery, SubSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubSubjectsQuery, SubSubjectsQueryVariables>(SubSubjectsDocument, options);
        }
export type SubSubjectsQueryHookResult = ReturnType<typeof useSubSubjectsQuery>;
export type SubSubjectsLazyQueryHookResult = ReturnType<typeof useSubSubjectsLazyQuery>;
export type SubSubjectsQueryResult = Apollo.QueryResult<SubSubjectsQuery, SubSubjectsQueryVariables>;
export const namedOperations = {
  Query: {
    SubSubjects: 'SubSubjects'
  }
}