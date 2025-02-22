import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/context/QueryClient";
export default function App({ Component, pageProps }: AppProps) {

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <QueryProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryProvider>
    </GoogleOAuthProvider>
  );
}
