import React, {ChangeEvent, useEffect, useState} from "react"
import {Button, Input, Popover, Tag, Popconfirm} from "antd"
import {GetRepositoryVariables} from "@/interface/SearchRepositories"

interface FormLineProps {
  inputValue: string,
  textSetCallback: (event: ChangeEvent<HTMLInputElement>)=>void,
  getDatas: (name?: string)=>void,
  resetData: ()=>void,
}

export const FormItem = (props: FormLineProps): React.ReactElement =>{
  const history: string | null =  localStorage.getItem("history")
  const [ historyList, setHistoryList ] = useState<string[]>(history ? JSON.parse(history) : [])
  const { inputValue, textSetCallback, getDatas, resetData} = props
  const historyCount: Number = 20

  useEffect(()=>{
    localStorage.setItem("history", JSON.stringify(historyList))
  }, [historyList])

  const getHistoryData = (): void => {
    const name = inputValue as string
    let list: string[] = historyList
    if(list.length < historyCount) {
      list.push(name)
    }else{
      list.shift()
      list.push(name)
    }
    setHistoryList(Array.from(new Set(list)))
  }
  const submit = () =>{
    if(inputValue){
      getHistoryData()
    }
    getDatas()
  }

  const onChangeTag = (e: React.MouseEvent<HTMLElement>): void => {
    const targetElement = e.target as HTMLElement;
    getDatas(targetElement.innerText)
  }

  const removeTag = (): void=> {
    setHistoryList([])
  }

  const closeTag = (e: string): void =>{
    setHistoryList(historyList.filter(res=>{
      return res !== e
    }))
  }

  const content = () => {
    return (
      <div>
        <div>
          {
            historyList.length > 0 ?
            historyList.map( item => {
              return (<Tag color="blue" className="history-tag" closable onClick={onChangeTag} onClose={()=>{closeTag(item)}} key={item}>
                <span className="history-tag-text">{item}</span>
              </Tag>)
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

  const SearchInput = () => {
    return(
      <Input placeholder="Please enter text" value={inputValue}
             onPressEnter={submit} onChange={textSetCallback}/>
    )
  }

  return (
    <div className="input-line">
      {historyList.length > 0 ?
       <Popover overlayClassName="history-popover" placement="bottom" title="Search History"
                trigger="click" content={content}>
         {SearchInput()}
        </Popover>
       : SearchInput()}
      <Button className="input-btn" type="primary" onClick={submit}>search</Button>
      <Button className="input-btn" onClick={resetData}>reset</Button>
    </div>
  )
}
