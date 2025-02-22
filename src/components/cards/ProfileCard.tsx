import { useState } from "react"
import { LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProfileCardProps {
  user: {
    names: string;
    email: string;
    profilePictureUrl?: string;
  };
  onLogout: () => void;
}

export function ProfileCard({ user, onLogout }: ProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 w-12 rounded-full overflow-hidden"
          aria-label="Open user menu"
        >
          {user.profilePictureUrl ? (
            <Image
            fill
              src={user.profilePictureUrl}
              alt={user.names}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white">
              <User className="h-5 w-5" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-4" align="end">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full overflow-hidden relative">
            {user.profilePictureUrl ? (
              <Image
                fill
                src={user.profilePictureUrl}
                alt={user.names}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white">
                <User className="h-6 w-6" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{user.names}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
          onClick={() => {
            setIsOpen(false)
            onLogout()
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 