import React from 'react'
import Link from 'next/link'

import { useState } from 'react';
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import {
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react'

const signup = () => {
  const auth = getAuth();
  const router = useRouter();

  // emailとpasswordを登録する関数
  const signupWithEmail = (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push("/")
    })
    .catch((error) => {
      alert(error.message)
    }); 

  };

  return (
    <>
      <Text pb="20px" fontSize='2xl'>ユーザー登録</Text>
      <form onSubmit={signupWithEmail}>
        <div>
          <FormLabel>Email address</FormLabel>
          <Input 
            name="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <FormLabel>password</FormLabel>
          <Input 
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <hr />
        <div>
        <Button type='submit' _hover={{backgroundColor:"rgba(206, 255, 0, 0.5)"}}>登録</Button>
        </div>
      </form>
      登録済みの方は<Link href={"/login"}>こちら</Link>

    </>
  )
} 

export default signup