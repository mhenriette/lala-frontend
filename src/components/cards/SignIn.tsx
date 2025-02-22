"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";

type Role = "renter" | "host";

interface RoleInfo {
  title: string;
  description: string;
}

const roleInfo: Record<Role, RoleInfo> = {
  renter: {
    title: "Sign in as a",
    description:
      "As a renter, you can browse and book properties for your stay. Enjoy a wide selection of accommodations tailored to your needs and preferences.",
  },
  host: {
    title: "Sign in as a",
    description:
      "As a host, you can list your property, manage bookings, and interact with potential renters. Share your space and earn income on your own terms.",
  },
};

export default function SignIn() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const { signIn} = useAuth();

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

   const handleLogin = (
     role: "renter" | "host",
     credentialResponse: CredentialResponse
   ) => {
    console.log(credentialResponse)
     return signIn({ type: role, credentialResponse });
   };

  return (
    <Card className="w-full max-w-md mx-auto relative">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Welcome To M-Seller
        </CardTitle>
        <CardDescription className="text-center">
          Choose your role to sign in
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 w-full">
        {selectedRole ? (
          <div className="text-center flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">
              Sign in as a{" "}
              <span className="text-[#F25F4C] font-bold">{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
            </h2>
            <p className="text-muted-foreground mb-4">
              {roleInfo[selectedRole].description}
            </p>
            {selectedRole === "renter" ? (
              <GoogleLogin
                onSuccess={(credentialResponse) =>
                  handleLogin("renter", credentialResponse)
                }
                useOneTap
                width="100%"
                text="signin_with"
              />
            ) : (
              <GoogleLogin
                onSuccess={(credentialResponse) =>
                  handleLogin("host", credentialResponse)
                }
                useOneTap
              />
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={() => handleRoleSelect("renter")}
              className="w-full font-semibold"
            >
              Sign in as a Renter
            </Button>
            <Button
              onClick={() => handleRoleSelect("host")}
              className="w-full font-semibold"
            >
              Sign in as a Host
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {selectedRole && (
          <Button onClick={() => setSelectedRole(null)} className="font-semibold">
            Back to Role Selection
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
