import { useEffect, useState } from 'react';
import { Button, List, Skeleton} from 'antd';

import { useQuery, gql } from '@apollo/client';
import {QueryResult} from '@apollo/client/react/types/types'

interface DataType extends QueryResult {
  data: {search:{nodes:Array<{name:string, url:string}>}}
}

function SearchList() {
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const GET_LOCATIONS = gql`
    query getRepository($name: String!){
      search(type: REPOSITORY, first: 50, query: $name) {
        repositoryCount
        nodes {
            ... on Repository {
              name
              description
              url
              stargazers {
                  totalCount
              }
          }
        }
      }
    }
  `
  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    variables: { name:'Hello-World' },
  })  as DataType;

  if (error) return <p>Error : {error.message}</p>;
  const loadMore =
    !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button>loading more</Button>
      </div>
    ) : null;
  return (
    <div>
      <Button type="primary">test</Button>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data ? data.search.nodes : []}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <div>{item.name}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default SearchList;
