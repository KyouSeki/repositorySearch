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
  publishedAt: string
}

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
};

// 定义变量类型
export interface GetIssuesVariables {
  repositoryId: string | undefined,
  first?: number,
  after?: string
};
