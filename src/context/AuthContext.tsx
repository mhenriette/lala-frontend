import { createContext, ReactNode, useContext, useState } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { login } from "@/utils/login";
import { decode} from "jsonwebtoken";
const AuthContext = createContext<any>({} as any);

export const AuthProvider = ({ children }: { children:  ReactNode }) => {
    const [userData, setUserData] = useState<any>(null);
    async function signIn(credentialResponse: CredentialResponse) {
     await login(credentialResponse);
      const accessToken = localStorage.getItem("@Auth:accessToken");
      const userData = decode(accessToken|| "");
      setUserData(userData);
      console.log(userData, "userData")
    }


    async function signOut(): Promise<void> {
      localStorage.removeItem("@Auth:accessToken");
      setUserData(null);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut , userData}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): any {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
