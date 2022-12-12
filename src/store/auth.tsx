import { useEffect, useState } from "react";
import { atom, useRecoilState, useSetRecoilState  } from "recoil";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "./firebase";
import 'firebase/auth'

type UserState = User | null;

const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    return onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);
    })
  }, []);
  return {isLoading, user};
};

// export const useUser = (): UserState => {
//   return useRecoilValue(userState);
// };
