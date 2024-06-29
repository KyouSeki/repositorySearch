import React, {ChangeEvent, useState} from "react"
import {Button, Input} from "antd"
import { HistoryTags } from "@/pages/SerachList/components/HistoryTags"

interface FormLineProps {
  inputValue: string,
  textSetCallback: (event: ChangeEvent<HTMLInputElement>)=>void,
  getDatasCallBack: (name?: string)=>void,
  resetDataCallBack: ()=>void,
}

/**
 * FormItem コンポーネント
 * @param props FormLineProps
 * @returns React.ReactElement
 * */

export const FormItem = (props: FormLineProps): React.ReactElement =>{
  const { inputValue, textSetCallback, getDatasCallBack, resetDataCallBack} = props
  const history: string | null =  localStorage.getItem("history")
  const [ historyList, setHistoryList ] = useState<string[]>(history ? JSON.parse(history) : [])
  const historyCount: Number = 20

  /**
   * hitoryTagsの追加、また最大数かどうかの判定
   * */
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

  /**
   * 検索ボタンのクリック時に呼び出される関数
   * */
  const submit = () =>{
    if(inputValue){
      getHistoryData()
    }
    getDatasCallBack()
  }

  /**
   * inputコンポーネントの要素を生成する
   * @returns React.ReactElement
   * */
  const SearchInput = () => {
    return(
      <Input placeholder="Please enter text" value={inputValue}
             onPressEnter={submit} onChange={textSetCallback}/>
    )
  }

  return (
    <div className="input-line">
      {historyList.length > 0 ?
        <HistoryTags historyList={historyList} getDatasCallBack={getDatasCallBack} setHistoryListCallBack={setHistoryList}>
          {SearchInput()}
        </HistoryTags>
       : SearchInput()}
      <Button className="input-btn" type="primary" onClick={submit}>search</Button>
      <Button className="input-btn" onClick={resetDataCallBack}>reset</Button>
    </div>
  )
}
