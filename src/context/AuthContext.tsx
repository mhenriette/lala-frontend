import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { login } from "@/utils/login";
import { decode} from "jsonwebtoken";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";

const AuthContext = createContext<any>({} as any);

export const AuthProvider = ({ children }: { children:  ReactNode }) => {
    const [userData, setUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);


  const getUserData = useCallback(() => {
    const accessToken = localStorage.getItem("@Auth:accessToken");
    if(accessToken){
      const userData = decode(accessToken);
      setUserData(userData);
      setIsSignedIn(true);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const signInMutation = useMutation({
    mutationFn: async ({credentialResponse, type}: {credentialResponse: CredentialResponse, type: "renter" | "host"}) => {
      await login(credentialResponse, type);
    },
    onSuccess: () => {
      getUserData();
      router.push("/");
      setIsSignedIn(true);
    },
    onError: (error: any) => {
      console.error("Error signing in", error);
    },
  });

    async function signOut(): Promise<void> {
      localStorage.removeItem("@Auth:accessToken");
      setUserData(null);
      setIsSignedIn(false);
  }

  return (
    <AuthContext.Provider value={{ signIn: signInMutation.mutate, signinLoading: signInMutation.isPending, signOut , userData, isSignedIn}}>
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
