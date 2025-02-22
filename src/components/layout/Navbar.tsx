import Link from "next/link";
import { useState, useEffect } from "react";
import { ProfileCard } from "../cards/ProfileCard";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "../ui/skeleton";



export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {signOut, userData, signinLoading, isSignedIn } = useAuth();
  const isHost = userData?.role === "HOST";
  const navLinks = [
    { href: "/", label: "Home" },
    { href: isHost ? "/hosts/properties" : "renters/properties", label: isHost ? 'My properties' : "Explore" },
    { href: "#about", label: "About" },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // e.preventDefault();
    const targetId = e.currentTarget.href.split('#')[1];
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors hover:text-[#F25F4C]"
          >
            <span
              className={`font-extrabold text-2xl ${
                scrolled ? "text-[#F25F4C]" : "text-white"
              }`}
            >
              M-Seller
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleScroll}
                className={`text-base font-bold transition-all duration-300 hover:text-[#F25F4C] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F25F4C] after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  scrolled ? "text-[#10172A]" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <>
            {signinLoading ? (
              <Skeleton className="h-12 w-12  rounded-full" />
            ) : isSignedIn ? (
              <ProfileCard user={userData} onLogout={signOut} />
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/signin"
                  className="text-white font-bold py-2 px-4 rounded-md bg-[#F25F4C]"
                >
                  Become a Member
                </Link>
              </div>
            )}
          </>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 mt-2 bg-white/95 rounded-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleScroll}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#F25F4C] hover:bg-blue-50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <ProfileCard user={userData} onLogout={signOut} />
          </div>
        )}
      </div>
    </nav>
  );
};
