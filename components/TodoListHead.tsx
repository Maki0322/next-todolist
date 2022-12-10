import React from 'react'
import { Thead, Tr, Th, Center } from '@chakra-ui/react'

const TodoListHead = () => {
  return (
    <>
      <Thead backgroundColor={"rgb(195, 195, 195)"}>
        <Tr>
          <Th w="auto">Task</Th>
          <Th w="150px"><Center>Status</Center></Th>
          <Th w="120px"><Center>Priority</Center></Th>
          <Th w="120px"><Center>Limit</Center></Th>
          <Th w="120px"><Center>Action</Center></Th>
        </Tr>
      </Thead>
    </>
  )
}

export default TodoListHead