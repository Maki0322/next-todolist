import Link from 'next/link'
import React from 'react'

const signup = () => {
  return (
    <>
      <div>アカウント登録</div>
      <p>登録済みの方は<Link href={"/login"}>こちら</Link></p>
    </>
  )
}

export default signup