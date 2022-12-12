import React from 'react'
import Link from 'next/link'
import styles from '../styles/signup.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import {
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Center,
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
      <Box
        w="350px" 
        m="50px auto" 
        p="30px 40px 40px 40px" 
        border="solid 1px rgb(220, 220, 220)" 
        borderRadius="20px"
      >
        <Text 
          pb="20px" 
          fontSize='2xl'
          fontWeight="700"
          >
            ユーザー登録
          </Text>
          <form onSubmit={signupWithEmail}>
          <Box>
            <FormLabel>Email address</FormLabel>
            <Input 
              name="email"
              type="email"
              placeholder="email"
            />
          </Box>
          <Box mt="10px">
            <FormLabel>password</FormLabel>
            <Input 
              name="password"
              type="password"
              placeholder="password"
            />
          </Box>
          <Box>
          <Button 
            type='submit' 
            _hover={{backgroundColor:"rgba(206, 255, 0, 0.5)"}}
            mt="30px"
            w="100%"
          >
            登録
          </Button>
          </Box>
        </form>
        <Center mt="10px">
          登録済みの方は
            <span className={styles.login_link}>
              <Link href={"/login"}>
                こちら
              </Link>
            </span>
        </Center>
      </Box>

    </>
  )
} 

export default signup