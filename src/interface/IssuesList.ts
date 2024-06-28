export interface Issues {
  title: string,
  url: string,
  description: string,
  id: string,
  loading?: boolean,
  author?: {
    login: string
    avatarUrl: string
  },
  createdAt: string
  state: "OPEN" | "CLOSED"
}

// 定义返回值类型
export interface GetIssuesQuery {
  node: {
    issues: {
      pageInfo: {
        hasNextPage: boolean,
        endCursor: string
      },
      nodes: Issues[];
    }
  };
}

// 定义参数类型
export interface GetIssuesVariables {
  repositoryId: string | undefined,
  first?: number,
  after?: string
}
