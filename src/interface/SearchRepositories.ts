// 定义查询类型
import {ChangeEvent} from 'react'

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
};

// 定义变量类型
export interface GetRepositoryVariables {
  name: string | undefined,
  first?: number,
  after?: string
};

export interface FormLineProps {
  query: GetRepositoryVariables,
  textChangeCallback: (event: ChangeEvent<HTMLInputElement>)=>void,
  getDatas: ()=>void,
  resetData: ()=>void,
}
