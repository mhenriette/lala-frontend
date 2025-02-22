import { useAuth } from "@/context/AuthContext";
import Redirect from "../utils/Redirect";
import { PropsWithChildren } from "react";
export default function HostLayout({ children }: PropsWithChildren) {
  const { userData, isSignedIn } = useAuth();
  if (userData?.role !== "HOST") {
    return <Redirect to="/" replace />;
  }
  if (!isSignedIn) {
    alert("Please sign in to continue");
    return  (
      <>
        <Redirect to="/" replace />
      
      </>
    );
  }
  return <>{children}</>;
}
