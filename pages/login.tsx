import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import {
 Button,
 FormLabel,
 Input,
 Text,
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
    <div>
      <div>
        <Text pb="20px" fontSize='2xl'>ログイン</Text>
        <form onSubmit={handleEmailLogin}>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
              <FormLabel>Email address</FormLabel>
              <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                />
            </div>
            <div>
              <FormLabel>password</FormLabel>
              <Input 
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </div>

            <div className="login-button">
            <Button type='submit' _hover={{backgroundColor:"rgba(206, 255, 0, 0.5)"}}>ログイン</Button>
            </div>
          </form>
            <Button onClick={handleGoogleLogin} type='submit' _hover={{backgroundColor:"rgba(206, 255, 0, 0.5)"}}>Googleログイン</Button>
            <div className="link-to-signup-area">
              ユーザー登録は<Link href={"/signup"}>こちら</Link>から
            </div>
        </div>

      </div>
    
   
    </>
  )
}

export default login
