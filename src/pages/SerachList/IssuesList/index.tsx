import React, {useEffect, useState } from "react";
import { Button, List, Skeleton, Avatar, Tooltip } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetIssuesQuery, GetIssuesVariables, Issues} from "@/interface/IssuesList"
import { GET_ISSUES_BY_REPOSITORY_ID } from "@/api"
import { LoadMore } from "@/pages/SerachList/components/LoadMore"
import {CheckCircleOutlined, ClockCircleOutlined} from '@ant-design/icons'

function IssuesList (): React.ReactElement {
  const navigate = useNavigate()
  const params = useParams()
  const count: number = 10
  const [nodes, setNodes] = useState<any>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [after, setAfter] = useState<string>("")
  const {fetchMore, loading, error, data} = useQuery<GetIssuesQuery, GetIssuesVariables>(GET_ISSUES_BY_REPOSITORY_ID, {
    variables: {repositoryId: params.id, first: count},
  });

  useEffect(() => {
    if (data) {
      setNodes(data.node.issues.nodes)
      setHasNextPage(data.node.issues.pageInfo.hasNextPage)
      setAfter(data.node.issues.pageInfo?.endCursor)
    }
  }, [data])

  if (error) return <p>Error : {error.message}</p>;

  const loadMoreFetch = (): void => {
    if (!data || !data.node || !data.node.issues) return;
    setNodes(
      [...nodes, ...Array.from({length: count}, () => ({loading: true}))]
    );
    fetchMore({
      variables: {repositoryId: params.id, after, first: count},
      updateQuery: (prev: GetIssuesQuery, {fetchMoreResult}: any): any => {
        if (!fetchMoreResult) return prev;
        return {
          node: {
            ...fetchMoreResult.node,
            issues: {...fetchMoreResult.node.issues, nodes: [...nodes, ...fetchMoreResult.node.issues.nodes]}
          }
        }
      },
    })
  }

  // 加载更多组件
  const loadMore: React.ReactElement | null =
    !loading && nodes.length > 0 && hasNextPage ? (
      <LoadMore loadMoreFetchCallback={loadMoreFetch}/>
    ) : null;

  const TitleItem = (item: Issues): React.ReactElement => {
    return (
      <span>
        <Tooltip title={item.state + " issue"}>
          {
            item.state === "OPEN" ? (<ClockCircleOutlined style={{color: "#1a7f37", marginRight: "5px"}}/>)
              : (<CheckCircleOutlined style={{color: "#8250df", marginRight: "5px"}}/>)
          }
        </Tooltip>
        {item.title}
      </span>
    )
  }

  return (
    <div>
      <div className="flex-between-box">
        <div>{data?.node.name}</div>
        <Button onClick={() => {
          navigate(-1)
        }}>back</Button>
      </div>
      <List
        className="load-more-list"
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
                title={TitleItem(item)}
                description={<span>by {item.author?.login || "ghost"}<span> createdTime: {item.createdAt}</span></span>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default IssuesList;
