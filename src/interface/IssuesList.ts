export interface Issues {
  title: string,
  url: string,
  description: string,
  id: string,
  author?: {
    login: string
    avatarUrl: string
  },
  createdAt: string
  state: "OPEN" | "CLOSED"
}

export interface GetIssuesQuery {
  node: {
    name: string,
    issues: {
      pageInfo: {
        hasNextPage: boolean,
        endCursor: string
      },
      nodes: Issues[];
    }
  };
}

export interface GetIssuesVariables {
  repositoryId: string | undefined,
  first?: number,
  after?: string
}
