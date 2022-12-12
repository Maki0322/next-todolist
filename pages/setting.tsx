import React from 'react'
import { useState } from 'react'
import { useRecoilState, useRecoilValue} from 'recoil';

import { Center, HStack, Text, VStack } from '@chakra-ui/react';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

import Header from '../components/Header';
import SettingModal from '../components/SettingModal';
import { modalShowState } from '../src/status/modalShowState';
import { profileState } from '../src/status/profileState';

const MyEditIcon = styled(EditIcon)({
  cursor: "pointer",
  borderRadius:"10px",
  fontSize:"32px",
  padding:"5px",
  "&:hover": {
    backgroundColor: "rgba(206, 255, 0, 0.5)",
  }
})


const setting: React.FC  = () => {
  // recoilで管理しているプロフィール情報を読み取って関数に設定
  const profile = useRecoilValue<any>(profileState);

  // プロフィール編集のモーダルウィンドウの開閉を管理
  const [settingModalShow, setSettingModalShow] = useState<boolean>(false)

  // プロフィールのモーダルウィンドウを開く関数
  const openProfile = () => {
    setSettingModalShow(true);
  }
  // プロフィールのモーダルウィンドウを閉じる関数
  const closeProfile = () => {
    setSettingModalShow(false);
  }

  // 別の場所をクリックしてもモーダルウィンドウを閉じる関数
  const [modalShow, setModalShow] = useRecoilState(modalShowState);
  const closeModalShow = () => {
    if(modalShow === true){
      setModalShow(false);
    }
  }

  return (
    <div onClick={closeModalShow}>
      <Header />
      <Center >
        <VStack 
          w="300px" 
          p="30px" 
          mt="50px" 
          border="1px solid rgb(200, 200, 200)" 
          borderRadius="20px"
        >
          <PersonIcon 
            style={{
              backgroundColor: "black", 
              color: "white", 
              fontSize:"100px", 
              borderRadius:"100px"
            }}
          />
          <HStack>
            <Text fontSize="3xl">{profile.userName}</Text>
            <MyEditIcon onClick={openProfile}/>
          </HStack>
          <Text fontSize="xl">{profile.memo}</Text>
        </VStack>
      </Center>
      <SettingModal 
        settingModalShow={settingModalShow} 
        closeProfile={closeProfile}
      />
    </div>
  )
}

export default setting