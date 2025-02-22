import { useAuth } from "@/context/AuthContext";
import Redirect from "../utils/Redirect";
import { PropsWithChildren } from "react";

export default function HostLayout({ children }: PropsWithChildren) {
  const { userData } = useAuth();
  console.log(userData, '==== here');
  if (userData?.role !== "HOST") {
    return <Redirect to="/" replace />;
  }
  return <>{children}</>;
}
