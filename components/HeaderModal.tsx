import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useRecoilState} from 'recoil';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { db, firebaseApp} from '../src/store/firebase';
import { profileState } from '../src/status/profileState';
import styles from '../styles/Header.module.css'


type Props = {
  modalShow: boolean;
}


const HeaderModal = ({modalShow}:Props) => {
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  // プロフィール情報をuseRecoilで管理
  const [profile, setProfile] = useRecoilState<any>(profileState)
  
  // 初回レンダリング時にprofile情報をfirebaseから取得してrecoilにセットする。
  // firebaseにprofile情報がない場合は、初期値を設定し、firebaseに送信してrecoilにもセットする。
  useEffect(()  => {
    const initialRendering = async() => {
      if(auth.currentUser === null){
        return
      } 
      // firebaseからユーザー情報を取得
      const initialProfile = doc(db, "users", auth.currentUser.uid)
      const snapProfile =  await getDoc(initialProfile)
      // 取得に成功した場合
      if (snapProfile.exists()){
        // firebaseのprofile情報をrecoilにセット
        setProfile(snapProfile.data())
      // 取得できなかった(データが入っていなかった)場合
      } else {
        // profileの初期値を設定
        const profileExapmle = {
          userName:"Name",
          memo:"よろしくお願いします。",
        }
        // 初期値を設定する関数
        const initialProfileValue = async() => {
          if(auth.currentUser === null){
            return
          } 
          // firebaseにprofile情報の初期値を送信
          const docRef = doc(db, "users", auth.currentUser.uid)
          await setDoc(docRef, profileExapmle);
          // recoilにも初期値をセット
          await setProfile(profileExapmle)
        }
        initialProfileValue()
      }
    }
    initialRendering()
  },[])

  // レンダリング時に走る関数
  useEffect(() => {
    if(auth.currentUser === null){
      return
    } 
    // firebaseからデータを取得
    const postProfile = doc(db, "users", auth.currentUser.uid)
    // リアルタイムでデータを取得
    onSnapshot(postProfile, (querySnapshot) => {
      setProfile(querySnapshot.data())
    })
  },[])

  // ログアウトする関数
  const handleLogout = async () => {
    await signOut(auth)
    await router.push("/login")
  };
  

  if(modalShow){
    return (
      <>
        <div id={styles.profile_modal}>
          <div id={styles.profile_modal_content}>
            <div className={styles.profile}>
              <div className={styles.profile_icon}>
                <PersonIcon 
                  style={{
                    backgroundColor: "black", 
                    color: "white", 
                    fontSize:"30px", 
                    borderRadius:"20px"
                  }}
                />
              </div>
              <div className={styles.profile_name}>
                {profile.userName}
              </div>
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
                <p onClick={handleLogout}>ログアウト</p>
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