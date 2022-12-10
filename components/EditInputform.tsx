import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { doc, updateDoc } from "firebase/firestore"
import { Button, Center, HStack, Input, Text, Textarea, Select } from '@chakra-ui/react'

import { auth, db } from '../src/store/firebase';
import styles from '../styles/Inputform.module.css'


interface Props {
  title :string;
}
type TodoPriority = "高" | "中" | "低" 


const EditInputForm = ({title}:Props) => {
  const router = useRouter();

  // TODOの各値をuseStateで管理(初期値は編集前の値)
  const [editTodoText, setEditTodoText] = useState<any>(router.query.text);
  const [editTodoDetail, setEditTodoDetail] = useState<any>(router.query.detail);
  const [editTodoLimit, setEditTodoLimit] = useState<any>(router.query.limit);
  
  // TODOリストの期限日時をfirebaseに上手く送れるように加工
  const newLim = Date.parse(editTodoLimit);
  const newLimit = new Date(newLim);

  // priorityのプルダウンの内容
  const priorityValue = ["高", "中", "低"];
  // priorityのプルダウンの値を管理
  const [todoPriority, setTodoPriority] = useState<any>(router.query.priority);
  // priorityのプルダウンを動かすための関数
  const handleChangePriority = (e:any) => {
    setTodoPriority(e.target.value);
  };

  // statusのプルダウンの内容
  const statusValue = ["未着手", "進行中", "完了"];
  // statusのプルダウンの値を管理
  const [todoStatus, setTodoStatus] = useState<any>(router.query.status);
  // priorityのプルダウンを動かすための関数
  const handleChangeStatus = (e:any) => {
    setTodoStatus(e.target.value);
  };

  // 変更(送信)ボタンを押したときにはしる関数
  const sendEditTodo = async(e:any) => {
    if(auth.currentUser === null){
      return
    } 
    // 送信ボタンを押したときに、画面がリロードしないようにpreventDefaultが必要。
    e.preventDefault();
    // docIdは編集前と同じものにする
    const docId= router.query.id as string;
    // ブラウザ上で記入したTODOリストをfirebaseに送信
    const docEdit = doc(db, "users", auth.currentUser.uid, "todos", docId); 
    await updateDoc(docEdit, {
      text:editTodoText,
      detail:editTodoDetail,
      limit:newLimit,
      priority:todoPriority,
      status:todoStatus,
      })
    await router.push("/");
  }


  return (
    <>
      <div className={styles.input_area}>
        <Text pb="20px" fontSize='2xl'>{title}</Text>
        <HStack pb="10px">
          <Text w="80px">task：</Text>
          <Input
            defaultValue={router.query.text}
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            onChange={(e) => setEditTodoText(e.target.value)}
          />
        </HStack>
        <HStack pb="10px">
          <Text w="80px">詳細：</Text>
          <Textarea  
            defaultValue={router.query.detail}
            onChange={(e) => setEditTodoDetail(e.target.value)}
          />
        </HStack>
        <HStack pb="10px">
          <Text w="80px">期限：</Text>
          <Input
            defaultValue={router.query.limitDate+"T"+router.query.limitTime}
            size="md"
            type="datetime-local"
            onChange={(e) => setEditTodoLimit(e.target.value)}
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
        <HStack pb="10px">
          <Text w="80px">状態：</Text>
          <Select 
            value={todoStatus}
            onChange={handleChangeStatus}
          >
            {statusValue.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          </HStack>        
        <Center>
          <Button type='submit' onClick={sendEditTodo}>送信</Button>
        </Center>
      </div>
    </>
  )
}

export default EditInputForm