import React from 'react'
import { useRecoilState} from 'recoil';

import AddInputform from '../components/AddInputform'
import Header from '../components/Header'
import { modalShowState } from '../src/status/modalShowState';


const add_todo = () => {
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
      <AddInputform title="新規TODO"/>
    </div>
  )
}

export default add_todo