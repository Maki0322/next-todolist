import React from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.css'
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {
  modalShow: boolean;
}

const HeaderModal = ({modalShow}:Props) => {
  if(modalShow){
    return (
      <>
        <div id={styles.profile_modal}>
          <div id={styles.profile_modal_content}>
            <div className={styles.profile}>
              <div className={styles.profile_icon}>
                <PersonIcon style={{backgroundColor: "black", color: "white", fontSize:"30px", borderRadius:"20px"}}/>
              </div>
              <div className={styles.profile_name}>taso</div>
            </div>
            <Link href={"/setting"}>
              <div className={styles.setting}>
                <SettingsIcon className={styles.setting_icon}/>
                <p>設定</p>
              </div>
            </Link>
            <Link href={"/login"}>
              <div className={styles.logout}>
                <LogoutIcon className={styles.logout_icon}/>
                <p>ログアウト</p>
              </div>
            </Link>
          </div>
        </div>
      </>
    )
  } else {
    return null;
  }
}

export default HeaderModal