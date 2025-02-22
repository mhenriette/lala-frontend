import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/context/QueryClient";
import "@/styles/globals.css";
import { PT_Sans } from "next/font/google";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <QueryProvider>
          <AuthProvider>
            <main className={ptSans.className}>
              <Component {...pageProps} />
            </main>
          </AuthProvider>
        </QueryProvider>
      </GoogleOAuthProvider>
  );
}
