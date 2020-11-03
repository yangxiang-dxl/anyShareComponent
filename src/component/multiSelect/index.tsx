import React, { useContext, useState } from 'react'
import {Modal} from 'antd'
import YXCascader from './cascader'
import { Button } from 'antd/lib/radio'
import './index.css'
import {observer} from 'mobx-react'
import Store from './cascader/cascader.store'
import { toJS } from 'mobx'
 const   MyModal = observer(()=>{
    let store =  useContext(Store)
    const [visible,setVisible]  = useState(false)
    const handleOk = ()=>{
    }
    const handleCancel = ()=>{
        setVisible(false)
    }
    return (
        <div>
            <button onClick={()=>setVisible(!visible) }>级联操作</button>
            <Modal
          title="Basic Modal"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={store.modalWidth}
        >
          <div>
          <YXCascader></YXCascader>
          </div>
          <div className='modalFooter' style={{
            display:'flex',
            justifyContent:"space-between",
    
          }}>
            <div className='modalFooterLeft'>
             <span onClick={()=>{
              store.num==4?store.num=4:store.num++
             }}>增加一级</span>
             <span onClick={()=>{
               store.num==2?store.num=2:store.num--
             }}>减少一级</span>
            </div>
            <div className='modalFooterRight'>
              <Button style={{
                // padding:'10px 15px',
                backgroundColor:'black',
                color:'white',
                borderRadius:'5px'
              }} onClick={
                ()=>{
                  console.log(toJS(store.datas))
                }
              }>确定</Button>
            </div>
          </div>
        </Modal>
        </div>
    )
})
export default MyModal