"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div>
      <h1 className="text-2xl text-red-500 ">hello world</h1>
      <ThemeToggle />
      {session ? <p>{session.user.name}</p> : <Button>Log in</Button>}
    </div>
  );
}
