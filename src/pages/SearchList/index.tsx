import React, {useEffect, useState, ChangeEvent, JSXElementConstructor} from 'react';
import { Button, List, Skeleton, Input} from 'antd';
import {useLazyQuery, useQuery, OperationVariables} from '@apollo/client';
import { GET_LOCATIONS, GetTodoQuery, GetTodoVariables} from '@/interface/SearchList'
import {FormItem} from '@/pages/SearchList/components/FormLine'
import './SearchList.css';

function SearchList() {
  const [nodes, setNodes] = useState<any>([])
  const [query, setQuery] = useState<GetTodoVariables>({name:'', after:''})
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const count: number = 10
  const [getRepository,
    {fetchMore, refetch, loading, error, data} ] = useLazyQuery<GetTodoQuery, GetTodoVariables>(GET_LOCATIONS);

  const getDatas = () =>{
    console.log('初始化加载')
    getRepository({ variables: {name:query.name, first: count} })
  }

  const resetData = () => {
    // setNodes([])
    setQuery({name:'', after:''})
    // refetch({name:'', first: count})
  }
  useEffect(()=>{
    console.log('data', data)
    if(data){
      setNodes(data.search.nodes)
      setHasNextPage (data.search.pageInfo.hasNextPage)
      setQuery({...query, after: data.search.pageInfo?.endCursor})
    }
  },[data])

  const textChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery({...query, name:event.target.value});
  };

  const loadMoreFetch = ():void => {
    //纷纷但是
    console.log('加载更多', query)
    if (!data || !data.search) return;
    setNodes(
      [...nodes, ...Array.from({ length: count }, () => ({ loading: true, name: {}, picture: {} }))]
    );
    fetchMore({
      variables: { name: query.name, after: query.after, first: count},
      updateQuery: (prev: GetTodoQuery, {fetchMoreResult}: any): GetTodoQuery => {
        if (!fetchMoreResult) return prev;
        return {
          search: {...fetchMoreResult.search, nodes:[...nodes, ...fetchMoreResult.search.nodes]}
        }
      },
    })
  }
  if (error) return <p>Error : {error.message}</p>;
  // 加载更多组件
  const loadMore =
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

  return (
    <div className='content'>
      <FormItem query={query} textChangeCallback={textChange} getDatas={getDatas} resetData={resetData}/>
      <Button className='input-btn' type="primary" onClick={getDatas}>search</Button>
      <List
        className="loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={nodes ? nodes as Array<{name: string; url: string; loading?:boolean}>  : []}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <div>{item.name}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default SearchList;
