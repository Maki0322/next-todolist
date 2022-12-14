import { atom } from "recoil";

export const profileState = atom<Object>({
  key: "profileState",
  default: {
    userName: "なまえ",
    memo:"よろしく。",
  },
})