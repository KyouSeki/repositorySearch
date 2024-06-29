import React, { useEffect, useState, ChangeEvent } from "react";
import { List, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GetRepositoryQuery, GetRepositoryVariables, Repository } from "@/interface/SearchRepositories"
import { FormItem } from "@/pages/SerachList/components/FormLine"
import { LoadMore } from "@/pages/SerachList/components/LoadMore"
import { GET_REPOSITORY_BY_QUERY } from "@/api"

/**
 * SearchRepositories コンポーネント
 * @returns React.ReactElement
 * */
function SearchRepositories(): React.ReactElement {
  const [nodes, setNodes] = useState<Repository[]>([])
  const [query, setQuery] = useState<GetRepositoryVariables>({name:"", after:""})
  const [inputValue, setInputValue] = useState<string>("")
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const count: number = 10
  const [getRepository,
    {fetchMore, loading, error, data} ] = useLazyQuery<GetRepositoryQuery, GetRepositoryVariables>(GET_REPOSITORY_BY_QUERY);

  // dataをイベントリスナーでデータを受け取る
  useEffect(()=>{
    if(data){
      setNodes(data.search.nodes)
      setHasNextPage (data.search.pageInfo.hasNextPage)
      setQuery(prev  => {
        return {
          ...prev,
          after: data.search.pageInfo?.endCursor
        }
      })
    }
  },[data])

  /**
   * 検索ボタンを押した時に呼ばれる関数
   * @param name 検索したい名前
   * @description 検索したい名前を受け取り、getRepositoryに渡す
   * */
  const getDatas = (name?:string) =>{
    if(name){
      setInputValue(name)
      setQuery(prev  => {
        return {
          ...prev,
          name: name
        }
      })
    }else{
      setQuery(prev  => {
        return {
          ...prev,
          name: inputValue
        }
      })
    }
  }

  // query.nameをイベントリスナーでgetRepositoryに渡す
  useEffect(() => {
    getRepository({ variables: {name:query.name, first: count}})
  }, [query.name]);

  /**
   * resetボタンを押した時に呼ばれる関数
   * @description 入力したデータを削除する
   * */
  const resetData = () => {
    setInputValue("");
  }

  /**
   * Inputのvalueを受け取る関数
   * */
  const textSet = (event: ChangeEvent<HTMLInputElement>):void => {
    setInputValue(event.target.value);
  }

  /**
   * loadMoreボタンを押した時に呼ばれる関数
   * @description loadMoreボタンを押した時に、次ぺーじのデータを追加する
   * */
  const loadMoreFetch = ():void => {
    if (!data || !data.search) return;
    // Skeletonを表示するために、仮にデータを追加する
    setNodes(prev  => {
      return [
        ...prev,
        ...Array.from({ length: count }, () => ({ loading: true }))
      ] as Repository[] & {loading: boolean}[]
    })
    fetchMore({
      variables: { name: query.name, after: query.after, first: count},
      updateQuery: (prev: GetRepositoryQuery, {fetchMoreResult}: {fetchMoreResult: GetRepositoryQuery}): GetRepositoryQuery => {
        if (!fetchMoreResult) return prev;
        return {
          search: {...fetchMoreResult.search, nodes:[...nodes, ...fetchMoreResult.search.nodes]}
        }
      },
    })
  }

  // loadMoreの要素を生成する
  const loadMore: React.ReactElement | null =
    !loading && nodes.length > 0 && hasNextPage? (
      <LoadMore loadMoreFetchCallback={loadMoreFetch}/>
    ) : null;

  // エラーが発生したら表示する
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <FormItem inputValue={inputValue} textSetCallback={textSet} getDatasCallBack={getDatas} resetDataCallBack={resetData}/>
      <List
        className="load-more-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={nodes ? nodes as Array<Repository & {loading: boolean}> : []}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-more" href={item.url} target="_blank">more</a>]}
          >
            <Skeleton title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<Link to={"/issues/" + item.id} className="list-title">{item.owner?.login+"/"+item.name}</Link>}
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default SearchRepositories;
