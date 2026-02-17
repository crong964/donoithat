"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const ParallelModal = ({
  children,
  url,
  title,
}: {
  children: React.ReactNode;
  url?: string;
  title?: string;
}) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setOpen(pathname == url);
    return () => {};
  }, [pathname, url]);
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={() => {
          router.back();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParallelModal;
