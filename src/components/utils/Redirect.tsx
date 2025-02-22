import { useRouter } from "next/router";
import { useEffect } from "react";

type TofRedirectProps = {
  to: string;
  replace?: boolean;
};

export default function Redirect({ to, replace }: TofRedirectProps) {
  const router = useRouter();
  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [to, replace, router]);

  return <p data-testid="loading">Redirecting...</p>;
}
