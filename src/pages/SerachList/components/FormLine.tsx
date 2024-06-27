import React, {ChangeEvent, useEffect, useState} from 'react'
import {Button, Input, Popover, Tag, Popconfirm} from 'antd'
import {GetRepositoryVariables} from '@/interface/SearchRepositories'

interface FormLineProps {
  query: GetRepositoryVariables,
  textChangeCallback: (event: ChangeEvent<HTMLInputElement>)=>void,
  getDatas: (name?: string)=>void,
  resetData: ()=>void,
}

export const FormItem = (props: FormLineProps): React.ReactElement =>{
  const history: string | null =  localStorage.getItem('history')
  const [ historyList, setHistoryList ] = useState<string[]>(history ? JSON.parse(history) : [])
  const { query, textChangeCallback, getDatas, resetData} = props

  useEffect(()=>{
    localStorage.setItem('history', JSON.stringify(historyList))
  }, [historyList])

  const getHistoryData = (): void => {
    const name = query.name as string
    let list: string[] = history ? JSON.parse(history): []
    if(list.length < 10) {
      list.push(name)
    }else{
      list.shift()
      list.push(name)
    }
    setHistoryList(Array.from(new Set(list)))
  }
  const submit = () =>{
    if(query.name){
      getHistoryData()
    }
    getDatas()
  }
  const closeTag = (e: any):void =>{
    setHistoryList(historyList.filter(res=>{
      return res !== e
    }))
  }
  const removeTag = () :void=> {
    setHistoryList([])
  }

  const onChangeTag = (e: any) => {
    getDatas(e.target.innerText)
  }

  const content = () => {
    return (
      <div>
        <div>
          {
            historyList.length > 0 ?
            historyList.map( item => {
              return (<Tag className='history-tag' closable onClick={onChangeTag} onClose={()=>{closeTag(item)}} key={item}>{item}</Tag>)
            }) : <div>No Data</div>
          }
        </div>
        {historyList.length > 0 ? (
          <div style={{textAlign: "right"}}>
            <Popconfirm
              title="Are you sure to delete this All tags?"
              onConfirm={removeTag}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" size="small" danger>
                remove
              </Button>
            </Popconfirm>
          </div> ): null
        }
      </div>
    )
  }

  return (
    <div className='input-line'>
      {historyList.length > 0 ?
        <Popover overlayClassName='history-popover' placement="bottom" title='Search History' trigger="click"
                 content={content}>
          <Input placeholder="Please enter text" value={query.name}
                 onChange={textChangeCallback}/>
        </Popover>
       : <Input placeholder="Please enter text" value={query.name}
                 onChange={textChangeCallback}/>}
      <Button className='input-btn' type="primary" onClick={submit}>search</Button>
      <Button className='input-btn' onClick={resetData}>reset</Button>
    </div>
  )
}
