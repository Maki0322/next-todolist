import React, { useState } from 'react'
import Link from 'next/link'
import PersonIcon from '@mui/icons-material/Person';
import styles from '../styles/Header.module.css'
import HeaderModal from './HeaderModal';

const Header: React.FC = () => {
  const[modalShow, setModalShow] = useState<boolean | any>(false);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_icon}>
          <Link href={"/"}>
            TODO
          </Link>
        </div>
        <div onClick={() => setModalShow(!modalShow)}>
          <PersonIcon style={{backgroundColor: "black", color: "white", fontSize:"25px", borderRadius:"20px"}}/>
        </div>
      </div>
      <HeaderModal modalShow={modalShow} />
    </>
  )
}

export default Header