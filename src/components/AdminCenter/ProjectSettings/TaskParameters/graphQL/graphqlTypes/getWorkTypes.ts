import * as Types from '../../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetWorkTypesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetWorkTypesQuery = { __typename?: 'Query', workTypes: Array<{ __typename?: 'WorkType', id: string, name: string, created: number, taskDelivery?: Array<{ __typename?: 'TaskDelivery', id: string, name: string, created: number } | null | undefined> | null | undefined } | null | undefined> };


export const GetWorkTypesDocument = gql`
    query GetWorkTypes {
  workTypes {
    id
    name
    created
    taskDelivery {
      id
      name
      created
    }
  }
}
    `;

/**
 * __useGetWorkTypesQuery__
 *
 * To run a query within a React component, call `useGetWorkTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkTypesQuery, GetWorkTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkTypesQuery, GetWorkTypesQueryVariables>(GetWorkTypesDocument, options);
      }
export function useGetWorkTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkTypesQuery, GetWorkTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkTypesQuery, GetWorkTypesQueryVariables>(GetWorkTypesDocument, options);
        }
export type GetWorkTypesQueryHookResult = ReturnType<typeof useGetWorkTypesQuery>;
export type GetWorkTypesLazyQueryHookResult = ReturnType<typeof useGetWorkTypesLazyQuery>;
export type GetWorkTypesQueryResult = Apollo.QueryResult<GetWorkTypesQuery, GetWorkTypesQueryVariables>;
export const namedOperations = {
  Query: {
    GetWorkTypes: 'GetWorkTypes'
  }
}