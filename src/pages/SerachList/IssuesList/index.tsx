import React, {useEffect, useState } from "react";
import { Button, List, Skeleton, Avatar, Tooltip } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetIssuesQuery, GetIssuesVariables, Issues} from "@/interface/IssuesList"
import { GET_ISSUES_BY_REPOSITORY_ID } from "@/api"
import {CheckCircleOutlined, ClockCircleOutlined} from '@ant-design/icons'
import { LoadMore } from "@/pages/SerachList/components/LoadMore"

/**
 * IssuesList コンポーネント
 * @returns React.ReactElement
 * */
function IssuesList (): React.ReactElement {
  const navigate = useNavigate()
  const params = useParams()
  const count: number = 10
  const [nodes, setNodes] = useState<Issues[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [after, setAfter] = useState<string>("")
  const {fetchMore, loading, error, data} = useQuery<GetIssuesQuery, GetIssuesVariables>(GET_ISSUES_BY_REPOSITORY_ID, {
    variables: {repositoryId: params.id, first: count},
  });

  // dataをイベントリスナーでデータを受け取る
  useEffect(() => {
    if (data) {
      setNodes(data.node.issues.nodes)
      setHasNextPage(data.node.issues.pageInfo.hasNextPage)
      setAfter(data.node.issues.pageInfo?.endCursor)
    }
  }, [data])

  /**
   * loadMoreボタンを押した時に呼ばれる関数
   * @description loadMoreボタンを押した時に、次ぺーじのデータを追加する
   * */
  const loadMoreFetch = (): void => {
    if (!data || !data.node || !data.node.issues) return;

    // Skeletonを表示するために、仮にデータを追加する
    setNodes(prev  => {
      return [
        ...prev,
        ...Array.from({length: count}, () => ({loading: true}))
      ] as Issues[] & {loading: boolean}[]
    })

    fetchMore({
      variables: {repositoryId: params.id, after, first: count},
      updateQuery: (prev: GetIssuesQuery, {fetchMoreResult}: {fetchMoreResult: GetIssuesQuery}): GetIssuesQuery => {
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

  // loadMoreの要素を生成する
  const loadMore: React.ReactElement | null =
    !loading && nodes.length > 0 && hasNextPage ? (
      <LoadMore loadMoreFetchCallback={loadMoreFetch}/>
    ) : null;

  // タイトルの要素を生成する
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

  // エラー時の処理
  if (error) return <p>Error : {error.message}</p>;

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
        dataSource={nodes ? nodes as Array<Issues & {loading: boolean}> : []}
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
