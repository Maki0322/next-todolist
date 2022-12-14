import { useEffect, useState } from "react";
import { atom, useSetRecoilState } from "recoil";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "firebase/auth";

type UserState = User | null;

const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const userAuthState = atom<boolean>({
  key: "userAuthState",
  default: false,
})

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);
  const setUserAuth = useSetRecoilState(userAuthState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user === null) return
      setUserAuth(user.uid !== "")
      setUser(user);
      setIsLoading(false);
    });
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading };
};