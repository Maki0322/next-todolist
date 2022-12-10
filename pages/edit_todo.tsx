import React from 'react'
import { useRecoilState} from 'recoil';

import EditInputForm from '../components/EditInputform'
import Header from '../components/Header'
import { modalShowState } from '../src/status/modalShowState';

const edit_todo = () => {
  // 別の場所をクリックしてもモーダルウィンドウを閉じる
  const[modalShow, setModalShow] = useRecoilState(modalShowState);
  const closeModalShow = () => {
    if(modalShow === true){
      setModalShow(false);
    }
  }
  
  return (
    <div onClick={closeModalShow}>
      <Header />
      <EditInputForm title="TODOを編集"/>
    </div>
  )
}

export default edit_todo