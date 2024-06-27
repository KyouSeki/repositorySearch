// 定义查询类型

export interface Repository {
  name: string,
  url: string,
  description: string,
  id: string,
  loading?: boolean
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

// 定义参数类型
export interface GetRepositoryVariables {
  name: string | undefined,
  first?: number,
  after?: string
}
