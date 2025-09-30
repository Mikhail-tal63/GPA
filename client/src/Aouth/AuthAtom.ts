// src/state/AuthAtom.js
import { atom } from "recoil";

const AuthAtom = atom({
  key: "AuthAtom", // لازم يكون فريد
  default: {
    user: null,
     // ممكن تكون "loading", "authenticated", "unauthenticated"
  },
});

export default AuthAtom;
