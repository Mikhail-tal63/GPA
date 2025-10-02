{/*import { atom } from "recoil";

export interface UserType {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  avatarPath?: string;
  iconUrl?: string;
  iconPath?: string;
  status?: string;
  privacy: boolean;
}

export const userAtom = atom<UserType | null>({
  key: "userAtom",   
  default: null,    R 
});*/}
import { atom } from "recoil";

const storedUser = localStorage.getItem("user-threds");

const userAtom = atom({
  key: "useratom",
  default: storedUser ? JSON.parse(storedUser) : null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue) {
          localStorage.setItem("user-threds", JSON.stringify(newValue));
        } else {
          localStorage.removeItem("user-threds");
        }
      });
    },
  ],
});
export default userAtom;