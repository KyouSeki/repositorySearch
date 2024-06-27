import React from 'react'
import { Button } from 'antd'

export const LoadMore = (props: {loadMoreFetchCallback: ()=>void}):React.ReactElement =>{
  const { loadMoreFetchCallback } = props
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={loadMoreFetchCallback}>loading more</Button>
    </div>
  )
}
