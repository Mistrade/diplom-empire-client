import * as Types from './graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTaskInfoQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetTaskInfoQuery = { __typename?: 'Query', taskInfo?: { __typename?: 'Task', title: string, description: string, creatorID?: { __typename?: 'User', name: string, surname: string, email: string } | null | undefined, academicSubject?: { __typename?: 'AcademicSubject', title: string, subSubjects?: Array<{ __typename?: 'SubSubject', title: string, description?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined, taskExecutor?: { __typename?: 'User', name: string, surname: string, phone?: string | null | undefined } | null | undefined } | null | undefined };


export const GetTaskInfoDocument = gql`
    query GetTaskInfo($id: ID!) {
  taskInfo(id: $id) {
    creatorID {
      name
      surname
      email
    }
    title
    description
    academicSubject {
      title
      subSubjects {
        title
        description
      }
    }
    taskExecutor {
      name
      surname
      phone
    }
  }
}
    `;

/**
 * __useGetTaskInfoQuery__
 *
 * To run a query within a React component, call `useGetTaskInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskInfoQuery(baseOptions: Apollo.QueryHookOptions<GetTaskInfoQuery, GetTaskInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskInfoQuery, GetTaskInfoQueryVariables>(GetTaskInfoDocument, options);
      }
export function useGetTaskInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskInfoQuery, GetTaskInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskInfoQuery, GetTaskInfoQueryVariables>(GetTaskInfoDocument, options);
        }
export type GetTaskInfoQueryHookResult = ReturnType<typeof useGetTaskInfoQuery>;
export type GetTaskInfoLazyQueryHookResult = ReturnType<typeof useGetTaskInfoLazyQuery>;
export type GetTaskInfoQueryResult = Apollo.QueryResult<GetTaskInfoQuery, GetTaskInfoQueryVariables>;
export const namedOperations = {
  Query: {
    GetTaskInfo: 'GetTaskInfo'
  }
}