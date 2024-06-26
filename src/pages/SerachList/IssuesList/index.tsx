import React, {useEffect, useState, ChangeEvent} from 'react';
import { Button, List, Skeleton, Avatar} from 'antd';
import {Link, useParams, useNavigate} from "react-router-dom";
import {useLazyQuery, useQuery, OperationVariables} from '@apollo/client';
import {GetIssuesQuery, GetIssuesVariables, Issues} from '@/interface/IssuesList'
import { GET_ISSUES_BY_REPOSITORY_ID } from '@/api'

function IssuesList (): React.ReactElement {
  const navigate = useNavigate()
  const params = useParams()
  const count: number = 10
  const [nodes, setNodes] = useState<any>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [after, setAfter] = useState<string>('')
  const {fetchMore, loading, error, data}  = useQuery<GetIssuesQuery, GetIssuesVariables>(GET_ISSUES_BY_REPOSITORY_ID, {
    variables: {repositoryId: params.id, first: count},
  });
  useEffect(()=>{
    if(data){
      console.log('datadatadatadata', data)
      setNodes(data.node.issues.nodes)
      setHasNextPage (data.node.issues.pageInfo.hasNextPage)
      setAfter(data.node.issues.pageInfo?.endCursor)
    }
  },[data])

  if (error) return <p>Error : {error.message}</p>;
  const loadMoreFetch = ():void => {
    //纷纷但是
    if (!data || !data.node.issues) return;
    setNodes(
      [...nodes, ...Array.from({ length: count }, () => ({ loading: true }))]
    );
    fetchMore({
      variables: {repositoryId: params.id, after, first: count},
      updateQuery: (prev: GetIssuesQuery, {fetchMoreResult}: any): any => {
        if (!fetchMoreResult) return prev;
        console.log('prev', prev)
        console.log('fetchMoreResult', {...fetchMoreResult.node})
        return {
          node: {
            ...fetchMoreResult.node,
            issues:  {...fetchMoreResult.node.issues, nodes: [...nodes, ...fetchMoreResult.node.issues.nodes]}
          }
        }
      },
    })
  }

  // 加载更多组件
  const loadMore: React.ReactElement | null =
    !loading && nodes.length > 0 && hasNextPage? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={loadMoreFetch}>loading more</Button>
      </div>
    ) : null;
  console.log('nodes', nodes)
  return(
    <div>
      <Button onClick={()=>{navigate(-1)}}> 返回</Button>
      <List
        className="loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={nodes ? nodes as Array<Issues> : []}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-more" href={item.url} target="_blank">more</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.author?.avatarUrl}>User</Avatar>}
                title={item.title}
                description={<span>{item.author?.login || 'ghost'}<span>：{item.publishedAt}</span></span>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default IssuesList;
