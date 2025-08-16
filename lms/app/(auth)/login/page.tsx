"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader, Outdent } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [githubPending, startGithubTransition] = useTransition();
  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed iw with github");
          },
          onError: () => {
            toast.error("internal server error");
          },
        },
      });
      // .then(() => toast.success("Signed in with GitHub"))
      // .catch(() => toast.error("Internal server error"));
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>Login with your Github email</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          className="w-full"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign in with Github
            </>
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className=" relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="s.tch@gmail.com" />
          </div>
          <Button>Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
}
