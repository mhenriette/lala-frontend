import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { login } from "@/utils/login";
import { decode} from "jsonwebtoken";
import { useMutation } from "@tanstack/react-query";

const AuthContext = createContext<any>({} as any);

export const AuthProvider = ({ children }: { children:  ReactNode }) => {
    const [userData, setUserData] = useState<any>(null);


  const getUserData = useCallback(() => {
    const accessToken = localStorage.getItem("@Auth:accessToken");
    if(accessToken){
      const userData = decode(accessToken);
      setUserData(userData);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const signInMutation = useMutation({
    mutationFn: async (credentialResponse: CredentialResponse) => {
      await login(credentialResponse);
    },
    onSuccess: () => {
      getUserData();
    },
    onError: (error: any) => {
      console.error("Error signing in", error);
    },
  });
  
    async function signOut(): Promise<void> {
      localStorage.removeItem("@Auth:accessToken");
      setUserData(null);
  }

  return (
    <AuthContext.Provider value={{ signIn: signInMutation.mutate, signinLoading: signInMutation.isPending, signOut , userData}}>
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
