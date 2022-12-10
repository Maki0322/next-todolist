import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useAuth } from '../src/store/auth'
import '../styles/globals.css'


type Props = {
  children: JSX.Element;
}

const Auth = ({children}: Props): JSX.Element => {
  const isLoading = useAuth();
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
