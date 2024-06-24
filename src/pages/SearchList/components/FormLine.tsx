import React, {ChangeEvent} from 'react'
import {Button, Input} from 'antd'
import {FormLineProps} from '@/interface/SearchList'

export const FormItem = (props: FormLineProps):React.ReactElement =>{
  const { query, textChangeCallback, getDatas, resetData} = props
  return (
    <div className='input-line'>
      <Input placeholder="入力してください" value={query.name}
             onChange={textChangeCallback}/>
      <Button className='input-btn' type="primary" onClick={getDatas}>search</Button>
      <Button className='input-btn' onClick={resetData}>reset</Button>
    </div>
  )
}
