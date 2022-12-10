import { Firestore } from "firebase/firestore"
import firebase from "firebase/compat/app"

export type Task = {
  id: string,
  text: string,
  detail: string,
  limit: firebase.firestore.Timestamp,
  priority? : any,
  status? : any,
  userId? :string,
  createdAt? : firebase.firestore.Timestamp,
}

