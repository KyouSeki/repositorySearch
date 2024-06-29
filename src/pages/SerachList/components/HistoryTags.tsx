import React, {useEffect} from 'react'
import {Button, Popconfirm, Popover, Tag} from "antd"

export interface HistoryTagsProps {
  historyList: string[],
  getDatasCallBack: (data: string) => void,
  setHistoryListCallBack: (data: string[]) => void
  children: React.ReactNode
}

/**
 * HistoryTags コンポーネント
 * @param props HistoryTagsProps
 * @returns React.ReactElement
 * */

export const HistoryTags = (props: HistoryTagsProps): React.ReactElement => {
  const { historyList, getDatasCallBack, setHistoryListCallBack } = props;

  // historyListをローカルストレージに保存する
  useEffect(()=>{
    localStorage.setItem("history", JSON.stringify(historyList))
  }, [historyList])

  /**
   * tagのクリックイベント
   * @param e React.MouseEvent<HTMLElement>
   * */
  const onClickTag = (e: React.MouseEvent<HTMLElement>): void => {
    const targetElement = e.target as HTMLElement;
    getDatasCallBack(targetElement.innerText)
  }

  /**
   * tagの削除イベント
   * @param e string
   * */
  const closeTag = (e: string): void =>{
    setHistoryListCallBack(historyList.filter(res=>{
      return res !== e
    }))
  }

  /**
   * tagの全部削除イベント
   * */
  const removeTag = (): void=> {
    setHistoryListCallBack([])
  }

  /**
   * tagのコンテンツ要素を作成する
   * @returns React.ReactElement
   * */
  const content = () => {
    return (
      <div>
        <div className="tags-box">
          {
            historyList.length > 0 ?
              historyList.map( item => {
                return (<Tag color="blue" className="history-tag" closable onClick={onClickTag} onClose={()=>{closeTag(item)}} key={item}>
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

  return (
    <Popover overlayClassName="history-popover" placement="bottom" title="Search History"
             trigger="click" content={content}>
      {props.children}
    </Popover>
  )
}
