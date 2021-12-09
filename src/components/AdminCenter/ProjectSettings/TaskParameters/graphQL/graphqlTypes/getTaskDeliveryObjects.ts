import * as Types from '../../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTaskDeliveryObjectsQueryVariables = Types.Exact<{
  parent: Types.Scalars['ID'];
}>;


export type GetTaskDeliveryObjectsQuery = { __typename?: 'Query', taskDeliveryObjects: Array<{ __typename?: 'TaskDelivery', id: string, created: number, name: string } | null | undefined> };


export const GetTaskDeliveryObjectsDocument = gql`
    query GetTaskDeliveryObjects($parent: ID!) {
  taskDeliveryObjects(parent: $parent) {
    id
    created
    name
  }
}
    `;

/**
 * __useGetTaskDeliveryObjectsQuery__
 *
 * To run a query within a React component, call `useGetTaskDeliveryObjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskDeliveryObjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskDeliveryObjectsQuery({
 *   variables: {
 *      parent: // value for 'parent'
 *   },
 * });
 */
export function useGetTaskDeliveryObjectsQuery(baseOptions: Apollo.QueryHookOptions<GetTaskDeliveryObjectsQuery, GetTaskDeliveryObjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskDeliveryObjectsQuery, GetTaskDeliveryObjectsQueryVariables>(GetTaskDeliveryObjectsDocument, options);
      }
export function useGetTaskDeliveryObjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskDeliveryObjectsQuery, GetTaskDeliveryObjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskDeliveryObjectsQuery, GetTaskDeliveryObjectsQueryVariables>(GetTaskDeliveryObjectsDocument, options);
        }
export type GetTaskDeliveryObjectsQueryHookResult = ReturnType<typeof useGetTaskDeliveryObjectsQuery>;
export type GetTaskDeliveryObjectsLazyQueryHookResult = ReturnType<typeof useGetTaskDeliveryObjectsLazyQuery>;
export type GetTaskDeliveryObjectsQueryResult = Apollo.QueryResult<GetTaskDeliveryObjectsQuery, GetTaskDeliveryObjectsQueryVariables>;
export const namedOperations = {
  Query: {
    GetTaskDeliveryObjects: 'GetTaskDeliveryObjects'
  }
}