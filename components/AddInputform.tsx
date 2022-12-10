import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import { Button, Center, HStack, Input, Text, Textarea, Select } from '@chakra-ui/react'

import { auth, db } from '../src/store/firebase';
import styles from '../styles/Inputform.module.css'



interface Props {
  title :string;
}
type TodoPriority = "高" | "中" | "低" 


const AddInputform = ({title}:Props) => {
  const router = useRouter();

  // 日時が空だとエラーになってしまうので、空の場合は初期値として現在時刻をいれる関数
  const currentTime = new Date().toLocaleString()

  // TODOの各値をuseStateで管理
  const [todoText, setTodoText] = useState("　");
  const [todoDetail, setTodoDetail] = useState("なし");
  const [todoLimit, setTodoLimit] = useState(currentTime);

  // TODOリストの期限日時をfirebaseに上手く送れるように加工
  const lim = Date.parse(todoLimit);
  const limit = new Date(lim);
  // TODOリストの作成日時をfirebaseに上手く送れるように加工
  const cA = Date.parse(currentTime);
  const createdAt = new Date(cA);

  // uuidで各TODOのdocIdを作成
  const docId = uuidv4();

  // priorityのプルダウンの内容
  const priorityValue = ["高", "中", "低"];
  // priorityのプルダウンの値をuseStateで管理
  const [todoPriority, setTodoPriority] = useState<TodoPriority>("高");
  // priorityのプルダウンを動かすための関数
  const handleChangePriority = (e:any) => {
    setTodoPriority(e.target.value);
  };

  // 送信ボタンを押したときに、firebaseのデータベースにデータを送信（追加）する関数
  const sendTodo = async(e: any) => {
    if(auth.currentUser === null){
      return
    } 
    e.preventDefault();
    // コレクションは"users"でその中にサブコレクションとして"todos"を作る
    const docRef = doc(db, "users", auth.currentUser.uid, "todos", docId)
    // ブラウザ上で記入したTODOリストをfirebaseに送信
    const data = {
      text:todoText,
      limit:limit,
      detail:todoDetail,
      id:docId,
      status:"未着手",
      priority:todoPriority,
      userId:auth.currentUser.uid,
      createdAt: createdAt,
    }
    await setDoc(docRef ,data);
    // 送信したらTopページに戻る
    await router.push("/");
  }


  return (
    <>
      <div className={styles.input_area}>
        <Text pb="20px" fontSize='2xl'>{title}</Text>
        <HStack pb="10px">
          <Text w="80px">task：</Text>
          <Input
            placeholder='taskを入力'
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </HStack>
        <HStack pb="10px">
          <Text w="80px">詳細：</Text>
          <Textarea  
            placeholder="taskの詳細を入力"
            onChange={(e) => setTodoDetail(e.target.value)}
          />
        </HStack>
        <HStack pb="10px">
          <Text w="80px">期限：</Text>
          <Input
            placeholder="日時を選択"
            size="md"
            type="datetime-local"
            onChange={(e) => setTodoLimit(e.target.value)}
          />
        </HStack>
        <HStack pb="10px">
          <Text w="80px">優先度：</Text>
          <Select 
            value={todoPriority}
            onChange={handleChangePriority}
          >
            {priorityValue.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </Select>
        </HStack>
        <Center>
          <Button type='submit' onClick={sendTodo}>送信</Button>
        </Center>
      </div>
    </>
  )
}

export default AddInputform