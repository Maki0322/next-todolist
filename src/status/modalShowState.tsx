import { atom } from "recoil";

export const modalShowState = atom<boolean>({
  key: "modalShowState",
  default: false,
})