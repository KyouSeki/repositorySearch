export interface Repository {
  name: string,
  url: string,
  description: string,
  id: string,
  owner: {
    login: string,
  }
}

export interface GetRepositoryQuery {
  search: {
    pageInfo: {
      hasNextPage: boolean,
      endCursor: string
    },
    nodes: Repository[];
  };
}

export interface GetRepositoryVariables {
  name: string | undefined,
  first?: number,
  after?: string
}
