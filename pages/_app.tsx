import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useAuth } from '../src/store/auth'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


type Props = {
  children: JSX.Element;
}

const Auth = ({children}: Props): JSX.Element => {
  const {isLoading, user} = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) return;
    router.push("/login")
  },[])
  return isLoading ? <p>Loading...</p> : children;
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Auth>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Auth>
    </RecoilRoot>
  )
}
