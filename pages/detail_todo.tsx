import React from 'react'
import Link from 'next/link';
import { useRecoilState} from 'recoil';
import { useRouter } from 'next/router';

import { Box, Button, Flex, Text, Spacer, Center } from '@chakra-ui/react';
import EditIcon from '@mui/icons-material/Edit';

import Header from '../components/Header';
import { modalShowState } from '../src/status/modalShowState';


type ToEditInfo = {
  text:any,
  limit:any,
  limitDate:any,
  limitTime:any,
  detail:any,
  id:any,
  priority:any,
  status:any,
}


const detail_todo = () => {
  const router = useRouter();
  // 編集ページに渡すprops
  const toEditInfo:ToEditInfo = {
    text:router.query.text,
    detail:router.query.detail,
    limit:router.query.limit,
    limitDate:router.query.limitDate,
    limitTime:router.query.limitTime,
    id:router.query.id,
    priority:router.query.priority,
    status:router.query.status,
  }
  // 別の場所をクリックしてもモーダルウィンドウを閉じる
  const[modalShow, setModalShow] = useRecoilState(modalShowState);
  const closeModalShow = () => {
    if(modalShow === true){
      setModalShow(false);
    }
  }

  return (
    <>
      <Header />
      <div onClick={closeModalShow}>
        <Center p="0 30px 0 0">
          <Flex w="1080px" minW="880px">
            <Spacer />
            
            {/* 編集ボタン*/}
            <Box>
              <Link href={{ pathname:`/edit_todo`, query:toEditInfo}}>
                <Button 
                  leftIcon={<EditIcon />}
                  color="black" 
                  variant='outline' 
                  _hover={{backgroundColor: "rgba(206, 255, 0, 0.5)"}}
                  size='sm'
                  mt="20px"
                  >
                  TODOを編集
                </Button>
              </Link>
            </Box>

          </Flex>   
        </Center>
        <Flex align='center'>
          <Spacer />

          {/* Container部分 */}
          <Box 
            minW="640px" 
            w="1080px" 
            m="20px"
          >
            
            {/* TODOのtext部分 */}
            <Box 
              m="10px" 
              p="15px" 
              bgColor="rgb(230 230 230)" 
              borderRadius="10px"
            >
              <Text fontSize='xl'>
                {router.query.text}
              </Text>
            </Box>

            {/* TODOの詳細部分 */}
            <Box 
              m="10px 10px 0px 10px" 
              p="10px" 
              border="solid 1px rgb(240 240 240)" 
              borderRadius="10px" 
            >
              <Text fontSize='xl' color="rgb(180 180 180)">
                Detail
              </Text>
              <Text>
                {router.query.detail}
              </Text>
            </Box>

            <Flex>

              {/* 進捗状況の部分 */}
              <Box 
                w="25%" 
                minW="115px" 
                m="10px" 
                p="10px" 
                border="solid 1px rgb(240 240 240)" 
                borderRadius="10px" 
              >
                <Text fontSize='xl' color="rgb(180 180 180)">
                  Status
                </Text>
                <Text>
                  {router.query.status}
                </Text>
              </Box>

              {/* 優先度の部分 */}
              <Box 
                w="25%" 
                minW="115px" 
                m="10px" 
                p="10px" 
                border="solid 1px rgb(240 240 240)" 
                borderRadius="10px" 
              >
                <Text fontSize='xl' color="rgb(180 180 180)">
                  Priority
                </Text>
                <Text>
                  {router.query.priority}
                </Text>
              </Box>              

              {/* 期限日時の部分 */}
              <Box 
                w="25%" 
                minW="165px" 
                m="10px" p="10px" 
                border="solid 1px rgb(240 240 240)" 
                borderRadius="10px" 
              >
                <Text fontSize='xl' color="rgb(180 180 180)">
                  Limit
                </Text>
                <Text>
                  {router.query.limitDate+" "+router.query.limitTime}
                </Text>
              </Box>

              {/* 作成日時の部分 */}
              <Box 
                w="25%" 
                minW="165px" 
                m="10px" 
                p="10px" 
                border="solid 1px rgb(240 240 240)" 
                borderRadius="10px" 
              >
                <Text fontSize='xl' color="rgb(180 180 180)">
                  creation-day
                </Text>
                <Text>
                  {router.query.createdAtDateTime}
                </Text>
              </Box>

            </Flex>
          </Box>
          <Spacer />
        </Flex>
      </div>
    </>
  )
}

export default detail_todo