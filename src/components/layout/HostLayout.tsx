import { useAuth } from "@/context/AuthContext";
import Redirect from "../utils/Redirect";
import { PropsWithChildren } from "react";
import Footer from "./Footer";

export default function HostLayout({ children }: PropsWithChildren) {
  const { userData, isSignedIn } = useAuth();
  if (!isSignedIn) {
    // alert("Please sign in to continue");
    return  (
      <>
        <Redirect to="/" replace />
      
      </>
    );
  }
  if (userData?.role !== "HOST") {
    return <Redirect to="/" replace />;
  }
  return (
    <div className="flex flex-col h-min-screen h-full flex-1">
      {/* <Navbar subpage /> */}
      <div className=" bg-slate-50- flex-1">
        {children}
      </div>
      
      <Footer />
    </div>
  );
}
