import { useEffect, useState } from "react";
import { atom, useSetRecoilState  } from "recoil";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "./firebase";
import 'firebase/auth'

type UserState = User | null;

const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useAuth = ():boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    return onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);
    })
  }, [setUser]);
  
  return isLoading;
};

// export const useUser = (): UserState => {
//   return useRecoilValue(userState);
// };
