import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

import { Tbody, Tr, Td, Select, Center } from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { auth, db } from '../src/store/firebase';
import styles from '../styles/TodoListLine.module.css'


type Props = {
  text: string,
  detail:string,
  createdAt:any,
  limit: any,
  id:any,
  status: any,
  priority: any,
}
type TodoStatus = "未着手" | "進行中" | "完了" 
type TodoPriority = "高" | "中" | "低" 

type EditInfo = {
  text:string,
  limit:any,
  limitDate:string,
  limitTime:string,
  detail:string,
  id:string,
  priority:any,
  status:any,
}
type DetailInfo = {
  text:string,
  detail:string,
  createdAt:any,
  createdAtDateTime:string,
  limit:any,
  limitDate:string,
  limitTime:string,
  id:string,
  priority:any,
  status:any,
}


const TodoListLine = ({text, detail, createdAt, limit, id, status, priority}:Props) => {
  // 受け取ったlimitをJSで使えるようにtoDate()で変換し、使いやすいようにDay.jsで変換
  const time = limit.toDate()
  const limitTime = dayjs(time);

  // 受け取ったcreatedAtをJSで使えるようにtoDate()で変換し、使いやすいようにDay.jsで変換
  const atTime = createdAt.toDate()
  const createdAtTime = dayjs(atTime); 

  // statusのプルダウンの内容
  const todoStatus = ["未着手", "進行中", "完了"];
  // statusのプルダウンの値を管理
  const [editTodoStatus, setEditTodoStatus] = useState<TodoStatus>(status);
  // statusのプルダウンを動かすための関数
  const handleChangeStatus = (e:any) => {
    setEditTodoStatus(e.target.value);
  };
  // statusのプルダウンの内容をfirebaseに送信する関数（クリックするたびに送信）
  const sendTodoStatus:any = useEffect(() => {
    if(auth.currentUser === null){
      return
    } 
    const docId = id;
    const docEdit = doc(db, "users", auth.currentUser.uid, "todos", docId); 
    updateDoc(docEdit, {
      status:editTodoStatus
    })
  },[editTodoStatus])

  // priorityのプルダウンの内容
  const todoPriority = ["高", "中", "低"];
  // priorityのプルダウンの値を管理
  const [editTodoPriority, setEditTodoPriority] = useState<TodoPriority>(priority);
  // priorityのプルダウンを動かすための関数
  const handleChangePriority = (e:any) => {
    setEditTodoPriority(e.target.value);
  };
  // priorityのプルダウンの内容をfirebaseに送信する関数（クリックするたびに送信）
  const sendTodoPriority:any = useEffect(() => {
    if(auth.currentUser === null){
      return
    } 
    const docId = id;
    const docEdit = doc(db, "users", auth.currentUser.uid, "todos", docId); 
    updateDoc(docEdit, {
      priority:editTodoPriority
    })
  },[editTodoPriority])

  // TODOリストを削除する
  const handleDeleteTodo = (e:any) => {
    if(auth.currentUser === null){
      return
    } 
    deleteDoc(doc(db, "users", auth.currentUser.uid, "todos",e));
  };

  // 編集ページに渡すprops
  const editInfo:EditInfo = {
    text:text,
    limit:limitTime.format('YYYY-MM-DD HH:mm'),
    limitDate:limitTime.format('YYYY-MM-DD'),
    limitTime:limitTime.format('HH:mm'),
    detail:detail,
    id:id,
    priority:priority,
    status:status,
  }

  // 詳細ページに渡すprops
  const detailInfo:DetailInfo = {
    text:text,
    detail:detail,
    createdAt:createdAt,
    createdAtDateTime:createdAtTime.format('YYYY-MM-DD HH:mm'),
    limit:limitTime.format('YYYY-MM-DD HH:mm'),
    limitDate:limitTime.format('YYYY-MM-DD'),
    limitTime:limitTime.format('HH:mm'),
    id:id,
    priority:priority,
    status:status,
  }
  return (
    <>
      <Tbody>
        <Tr>
          <Td w="auto" overflowWrap="normal" className={styles.open_detail_page}>
            <Link 
              href={{ 
                pathname:`/detail_todo`, 
                query:detailInfo
              }}>
                {text}
                <OpenInNewIcon sx={{ fontSize: 16}} />
            </Link>
          </Td>
          <Td w="150px">
            <Center>
              <Select 
                size='sm' 
                w="100px"
                value={editTodoStatus}
                onChange={handleChangeStatus}
                onClick={sendTodoStatus}
                >
                {todoStatus.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Center>
          </Td>
          <Td w="120px">
            <Center>
              <Select 
                size='sm' 
                w="70px"
                value={editTodoPriority}
                onChange={handleChangePriority}
                onClick={sendTodoPriority}
                >
                {todoPriority.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </Select>
            </Center>
          </Td>
          <Td w="120px">
            <Center>
              {limitTime.format('YYYY-MM-DD HH:mm')}
            </Center>
          </Td>
          <Td w="120px">
            <Center>
              <div className={styles.action_buttons}>
                <div className={styles.edit_icon}>
                  <Link 
                    href={{ 
                      pathname:`/edit_todo`, 
                      query:editInfo
                    }}
                  >
                    <EditIcon  sx={{ p: "2px", fontSize: 30 }}/>
                  </Link>
                </div>
                <div 
                  className={styles.delete_icon} 
                  onClick={() => handleDeleteTodo(id)}
                >
                  <DeleteForeverIcon sx={{ p: "2px", fontSize: 30  }}/>
                </div>
              </div>
            </Center>
          </Td>
        </Tr>
      </Tbody>
    </>
  )
}

export default TodoListLine