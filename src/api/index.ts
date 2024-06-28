import {DocumentNode, gql} from "@apollo/client"

export const GET_REPOSITORY_BY_QUERY: DocumentNode = gql`
    query getRepository($name: String!, $first: Int!, $after: String){
      search(type: REPOSITORY, first: $first, query: $name, after: $after) {
        repositoryCount
        nodes {
          ... on Repository {
            name
            description
            url
            id
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `

export const GET_ISSUES_BY_REPOSITORY_ID: DocumentNode  = gql`
  query GetIssuesByRepositoryId($repositoryId: ID!, $first: Int!, $after: String) {
    node(id: $repositoryId) {
      ... on Repository {
        issues(first: $first, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            id
            title
            url
            author {
              login
              avatarUrl
            }
            createdAt
            state
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;
