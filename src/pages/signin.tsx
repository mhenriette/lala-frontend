import SignIn from "@/components/cards/SignIn";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function signin() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('/hero.avif')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <Navbar />
      <SignIn />
      <div className="bottom-0 w-full fixed">
        <Footer />
      </div>
    </main>
  );
}
