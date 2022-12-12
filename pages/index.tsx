import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRecoilState } from 'recoil';
import firebase from "firebase/compat/app"
import { collection, onSnapshot, orderBy, query, } from 'firebase/firestore';

import { Table, TableContainer, Button, Select, Flex, Box, Spacer, Text, Center } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import TodoListHead from '../components/TodoListHead';
import TodoListLine from '../components/TodoListLine';
import { auth, db } from '../src/store/firebase';
import { modalShowState } from '../src/status/modalShowState';
import { useRouter } from 'next/router';


type Todo = any;
type SetTodo = any;
type FilterTodoStatus = "すべて" | "未着手" | "進行中" | "完了" 
type FilterTodoPriority = "すべて" | "高" | "中" | "低" 

type Task = {
  id: string,
  text: string,
  detail: string,
  limit: firebase.firestore.Timestamp,
  priority? : any,
  status? : any,
  userId? :string,
  createdAt? : firebase.firestore.Timestamp,
}

const Home  = () => {
  const router = useRouter();

  // 【TODOリストを管理】
  // TODOリストの内容をを管理
  const [todos, setTodos] = useState<Todo>([]);
  // TODOリストをfirebaseのusersというコレクションに追加する
  useEffect(() => {
    if(auth.currentUser === null){
      return
    } 
    const postData = collection(db, "users", auth.currentUser.uid, "todos");
    // 投稿順にTODOを並び変える
    const q = query(postData, orderBy("createdAt", "asc"));
    // リアルタイムでデータを取得
    onSnapshot(q, (querySnapshot:any) => {
      setTodos(querySnapshot.docs.map((doc:any) => doc.data()))
    })
  }, [])

  // 【statusフィルターを実装】
  // statusフィルターのプルダウンの内容
  const filterStatus = ["すべて", "未着手", "進行中", "完了"];
  // プルダウンの値を管理
  const [filterStatusTodo, setFilterStatusTodo] = useState<FilterTodoStatus>("すべて");
  // プルダウンを動かすための関数
  const handleChangeFilterStatus = (e:any) => {
    setFilterStatusTodo(e.target.value);
  };

  // 【priorityフィルターを実装】
  // priorityフィルターのプルダウンの内容
  const filterPriority = ["すべて", "高", "中", "低"];
  // プルダウンの値を管理
  const [filterPriorityTodo, setFilterPriorityTodo] = useState<FilterTodoPriority>("すべて");
  // プルダウンを動かすための関数
  const handleChangePriority = (e:any) => {
    setFilterPriorityTodo(e.target.value);
  };

  // 【フィルターボタンで選択した内容をTODOリストに反映させる】
  // フィルターで絞り込んだTODOの値を管理
  const [filteredTodoLists, setFilteredTodoLists] = useState<SetTodo>([...todos]);
  // todos（TODOリストの内容） と statusフィルターが更新されるたびに filteredTodoLists を更新することで、<select>タグと表示されるTODOリストを連携
  useEffect(() => {
    if(filterStatusTodo === 'すべて'){
      setFilteredTodoLists([...todos])
    } else {
      setFilteredTodoLists(todos.filter((todo:any) => {
        return todo.status == filterStatusTodo
      }))
    }     
  }, [todos, filterStatusTodo])

  // todos（TODOリストの内容） と priorityフィルターが更新されるたびに filteredTodoLists を更新することで、<select>タグと表示されるTODOリストを連携
  useEffect(() => {
    if(filterPriorityTodo === 'すべて'){
      setFilteredTodoLists([...todos])
    } else {
      setFilteredTodoLists(todos.filter((todo:any) => {
        return todo.priority == filterPriorityTodo
      }))
    }     
  }, [todos, filterPriorityTodo])

  // 別の場所をクリックしてもモーダルウィンドウを閉じる
  const[modalShow, setModalShow] = useRecoilState(modalShowState);
  const closeModalShow = () => {
    if(modalShow === true){
      setModalShow(false);
    }
  }


  return (
    <>
      <Head>
        <title>TODOリスト</title>
        <meta name="TODOリスト" content="Todo List" />
      </Head>

      <div onClick={closeModalShow}>
        <Box w="100%" position="fixed" zIndex="150" top="0" left="0">
          <Header />
        </Box>
        <Box mt="45px">
          <Center p="20px 20px 0 20px">
            <Flex w="1080px">

            {/* STATUSフィルターの部分 */}
              <Box pr="10px">
                <Text fontSize="sm">STATUS</Text>
                <Select 
                  size='sm' 
                  w="150px"
                  value={filterStatusTodo}
                  onChange={handleChangeFilterStatus}
                  >
                  {filterStatus.map((state) => (
                    <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </Select>
              </Box>

              {/* PRIORITYフィルターの部分 */}
              <Box>
                <Text fontSize="sm">PRIORITY</Text>
                <Select 
                  size='sm' 
                  w="150px"
                  value={filterPriorityTodo}
                  onChange={handleChangePriority}
                  >
                  {filterPriority.map((state) => (
                    <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </Select>
              </Box>

              <Spacer />
              
              {/* 新規TODO追加ボタンの部分 */}
              <Box>
                <Link href={"/add_todo"}>
                  <Button 
                    leftIcon={<AddIcon fontSize="10px"/>}
                    color="black" 
                    variant='outline' 
                    _hover={{backgroundColor: "rgba(206, 255, 0, 0.5)"}}
                    size='sm'
                    >
                    新規TODO
                  </Button>
                </Link>
              </Box>
              
            </Flex>
          </Center>

          {/* TODOリスト部分 */}
          <div className={styles.todolist}>
            <Center>
              <TableContainer w="1080px" border="solid 1px rgb(195,195, 195)" m={"20px"}>
                <Table variant='simple'>
                  <TodoListHead />
                  {filteredTodoLists.map((todo:Task) => (  
                    <TodoListLine 
                      text={todo.text}
                      limit={todo.limit}
                      id={todo.id}
                      status={todo.status}
                      priority={todo.priority}
                      key={todo.id}
                      detail={todo.detail}
                      createdAt={todo.createdAt}
                    />
                  ))} 
                </Table>
              </TableContainer>
            </Center>
          </div>

        </Box>
      </div>
    </>
  )

 }



export default Home