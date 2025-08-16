"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("signed out succesfuly");
        },
      },
    });
  }

  return (
    <div>
      <h1 className="text-2xl text-red-500 ">hello world</h1>
      <ThemeToggle />
      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      ) : (
        <Button>Log in</Button>
      )}
    </div>
  );
}
