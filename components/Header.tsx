import Link from 'next/link'
import { useRecoilState} from 'recoil';
import PersonIcon from '@mui/icons-material/Person';

import HeaderModal from './HeaderModal';
import { modalShowState } from '../src/status/modalShowState';
import styles from '../styles/Header.module.css'


const Header = () => {
  // ヘッダーのモーダルの値をrecoilで管理
  const[modalShow, setModalShow] = useRecoilState(modalShowState);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_icon}>
          <Link href={"/"}>
            TODO
          </Link>
        </div>
        <div 
          className={styles.header_profile_icon} 
          onClick={() => setModalShow(!modalShow)}
        >
          <PersonIcon 
            style={{
              backgroundColor: "black", 
              color: "white", 
              fontSize:"25px", 
              borderRadius:"20px"
            }}
          />
        </div>
      </div>
      <HeaderModal modalShow={modalShow} />
    </>
  )
}

export default Header