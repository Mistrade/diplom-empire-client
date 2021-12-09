import * as Types from '../../../../../../graphqlTypes/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetAvailableTaskDeliveryMethodsQueryVariables = Types.Exact<{
  parent: Types.Scalars['ID'];
}>;


export type GetAvailableTaskDeliveryMethodsQuery = { __typename?: 'Query', availableTaskDeliveryMethods: { __typename?: 'AvailableTaskDelivery', available: Array<{ __typename?: 'TaskDelivery', id: string, name: string, created: number }>, alreadyExists: Array<{ __typename?: 'TaskDelivery', id: string, name: string, created: number }> } };


export const GetAvailableTaskDeliveryMethodsDocument = gql`
    query GetAvailableTaskDeliveryMethods($parent: ID!) {
  availableTaskDeliveryMethods(parent: $parent) {
    available {
      id
      name
      created
    }
    alreadyExists {
      id
      name
      created
    }
  }
}
    `;

/**
 * __useGetAvailableTaskDeliveryMethodsQuery__
 *
 * To run a query within a React component, call `useGetAvailableTaskDeliveryMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableTaskDeliveryMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableTaskDeliveryMethodsQuery({
 *   variables: {
 *      parent: // value for 'parent'
 *   },
 * });
 */
export function useGetAvailableTaskDeliveryMethodsQuery(baseOptions: Apollo.QueryHookOptions<GetAvailableTaskDeliveryMethodsQuery, GetAvailableTaskDeliveryMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailableTaskDeliveryMethodsQuery, GetAvailableTaskDeliveryMethodsQueryVariables>(GetAvailableTaskDeliveryMethodsDocument, options);
      }
export function useGetAvailableTaskDeliveryMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableTaskDeliveryMethodsQuery, GetAvailableTaskDeliveryMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailableTaskDeliveryMethodsQuery, GetAvailableTaskDeliveryMethodsQueryVariables>(GetAvailableTaskDeliveryMethodsDocument, options);
        }
export type GetAvailableTaskDeliveryMethodsQueryHookResult = ReturnType<typeof useGetAvailableTaskDeliveryMethodsQuery>;
export type GetAvailableTaskDeliveryMethodsLazyQueryHookResult = ReturnType<typeof useGetAvailableTaskDeliveryMethodsLazyQuery>;
export type GetAvailableTaskDeliveryMethodsQueryResult = Apollo.QueryResult<GetAvailableTaskDeliveryMethodsQuery, GetAvailableTaskDeliveryMethodsQueryVariables>;
export const namedOperations = {
  Query: {
    GetAvailableTaskDeliveryMethods: 'GetAvailableTaskDeliveryMethods'
  }
}