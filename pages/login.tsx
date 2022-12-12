import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import {
  Box,
 Button,
 Center,
 Flex,
 FormLabel,
 Highlight,
 Input,
 Text,
 Grid, GridItem,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { firebaseApp } from '../src/store/firebase'


const login = () => {
  const router = useRouter();
  const auth = getAuth();

  const [error, setError] = useState('');

  // emailでログインするための関数
  const handleEmailLogin = async(event: any) => {
    event.preventDefault();
    const { email, password } = event.currentTarget.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {
      router.push("/")
      console.log('ログイン成功=', user.user.uid)
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('正しいメールアドレスの形式で入力してください。');
          break;
        case 'auth/user-not-found':
          setError('メールアドレスかパスワードに誤りがあります。');
          break;
        case 'auth/wrong-password':
          setError('メールアドレスかパスワードに誤りがあります。');
          break;
        default:
          setError('メールアドレスかパスワードに誤りがあります。');
          break;
      }
    });
  };

  // googleアカウントでログインするための関数
  const handleGoogleLogin = async(event: any) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, provider)
    .then((result) => {
      router.push("/")
      console.log('ログイン成功=', result.user.uid)
    }).catch((error) => {
      switch (error.code) {
        case 'error.customData.email':
          setError('そのメールアドレスは既に使用されています。');
          break;
      }
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
          ログイン
        </Text>
        <form onSubmit={handleEmailLogin}>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <Box>
            <FormLabel>Email address</FormLabel>
            <Input 
                id="email"
                name="email"
                type="email"
                placeholder="email"
              />
          </Box>
          <Box mt="10px">
            <FormLabel>password</FormLabel>
            <Input 
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
          </Box>
          <Button 
            type='submit' 
            _hover={{backgroundColor:"rgba(206, 255, 0, 0.5)"}}
            mt="20px"
            w="100%"
          >
            ログイン
          </Button>
        </form>
        <Center mt="10px">
            ユーザー登録は
              <span className={styles.signup_link}>
                <Link href={"/signup"}>
                  こちら
                </Link>
              </span>
            から
        </Center>
        <Grid 
          templateColumns='repeat(3, 1fr)' 
          gap={1} 
          placeItems="center" 
          m="20px 0 10px 0"
        >
          <GridItem 
            colSpan={1} 
            w='100%' 
            h='1px' 
            bg='rgb(220, 220, 220)' 
          />
          <Center>または</Center>
          <GridItem 
            colStart={3} 
            w='100%' 
            h='1px' 
            bg='rgb(220, 220, 220)' 
          />
        </Grid>
        <Button 
          onClick={handleGoogleLogin} 
          type='submit' 
          _hover={{backgroundColor:"rgba(206, 255, 0, 0.5)"}}
          w="100%"
        >
          Googleでログイン
        </Button>
      </Box>
    </>
  )
}

export default login
