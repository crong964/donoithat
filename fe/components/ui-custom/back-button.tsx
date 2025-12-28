"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button variant={"blue"} type="button" onClick={handleBack}>
      Trở về
    </Button>
  );
}
