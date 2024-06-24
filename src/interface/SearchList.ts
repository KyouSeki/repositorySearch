// 定义查询类型
import {gql} from '@apollo/client'
import {ChangeEvent} from 'react'
export const GET_LOCATIONS = gql`
    query getRepository($name: String!, $first: Int!, $after: String){
      search(type: REPOSITORY, first: $first, query: $name, after: $after) {
        repositoryCount
        nodes {
            ... on Repository {
              name
              description
              url
              stargazers {
                  totalCount
              }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `
export interface Repository {
  name: string;
  url: string;
}

export interface GetTodoQuery {
  search: {
    pageInfo: {
      hasNextPage: boolean,
      endCursor: string
    },
    nodes: Repository[];
  };
};

// 定义变量类型
export interface GetTodoVariables {
  name: string | undefined,
  first?: number,
  after?: string
};

export interface FormLineProps {
  query: GetTodoVariables,
  textChangeCallback: (event: ChangeEvent<HTMLInputElement>)=>void,
  getDatas: ()=>void,
  resetData: ()=>void,
}
