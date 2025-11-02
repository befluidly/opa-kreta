import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RedirectShop() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/shop");
  }, [router]);

  return null;
}
