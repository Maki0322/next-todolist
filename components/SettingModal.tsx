import React,{ useState } from 'react'
import { useRecoilValue } from 'recoil';
import { doc, setDoc } from 'firebase/firestore';

import {  Button, Center, HStack, Input, Text, Textarea } from '@chakra-ui/react'
import CloseIcon from '@mui/icons-material/Close';

import { auth, db } from '../src/store/firebase';
import { profileState } from '../src/status/profileState';
import styles from '../styles/SettingModal.module.css'


type Props = {
  settingModalShow : boolean,
  closeProfile : any,
}


const SettingModal = ({settingModalShow,closeProfile}:Props) => {
  // プロフィール情報をuseRecoilValueで取得
  const profile = useRecoilValue<any>(profileState);

  // ユーザーネームをuseStateで管理(初期値は編集前のもの)
  const [name, setName] = useState<string>(profile.userName);
  // ユーザーの一言メモをuseStateで管理(初期値は編集前のもの)
  const [userMemo, setUserMemo] = useState<string>(profile.memo);

// 変更(送信)ボタンを押したときにはしる関数
const sendProfile = async(e:any) => {
  if(auth.currentUser === null){
    return
  } 
  // 送信ボタンを押したときに、画面がリロードしないようにpreventDefaultが必要
  e.preventDefault();
  // ブラウザ上で記入したprofileをfirebaseに送信
  const docRef = doc(db, "users", auth.currentUser.uid)
  const profile = {
    userName:name,
    memo:userMemo,
  }
  await setDoc(docRef, profile);
  // モーダルウィンドウを閉じる
  await closeProfile();
}


  if(settingModalShow) {
    return (
      <>
        <div 
          id={styles.overlay} 
          onClick={closeProfile}
        >
          <div 
            id={styles.content} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.input_area}>
              <CloseIcon onClick={closeProfile}/>
              <HStack pb="10px">
                <Text w="80px">Name：</Text>
                <Input
                  defaultValue={profile.userName}
                  _placeholder={{ opacity: 1, color: 'gray.500' }}
                  onChange={(e) => setName(e.target.value)}
                />
              </HStack>
              <HStack pb="10px">
                <Text w="80px">memo：</Text>
                <Textarea  
                  defaultValue={profile.memo}
                  onChange={(e) => setUserMemo(e.target.value)}
                />
              </HStack>
              <Center>
                <Button type='submit' onClick={sendProfile}>送信</Button>
              </Center>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return null;
  }
}

export default SettingModal