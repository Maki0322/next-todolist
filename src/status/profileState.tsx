import { atom } from "recoil";
import { ProfileType } from "../../types/ProfileType";

export const profileState = atom<Object>({
  key: "profileState",
  default: {
    userName: "なまえ",
    memo:"よろしく。",
  },
})