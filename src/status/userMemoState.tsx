import { atom } from "recoil";

export const userMemoState = atom<string>({
  key: "userMemoState",
  default: "よろしくお願いします。",
})