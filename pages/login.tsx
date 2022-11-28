import Link from 'next/link'
import React from 'react'

const login = () => {
  return (
    <>
      <div>ログイン画面</div>
      <button><Link href={"/"}>ログイン</Link></button>
      <p>登録は<Link href={"/signup"}>こちら</Link></p>
    </>
  )
}

export default login