"use client";
import { useLinkStatus } from "next/link";

export default function LoadingLink() {
  const { pending } = useLinkStatus();
  return pending ? (
    <div role="status" aria-label="Loading">
      loading...
    </div>
  ) : null;
}
