import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface iPaginationSingle {
  curPage: number;
  disableNext: boolean;
  onNext: (next: number) => void;
  onPre: (next: number) => void;
}
const PaginationSingle = ({
  curPage,
  disableNext,
  onNext,
  onPre,
}: iPaginationSingle) => {
  return (
    <div className="flex">
      <Button
        variant={"ghost"}
        onClick={() => {
          onPre(curPage - 1);
        }}
        disabled={curPage == 0}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant={"ghost"}
        onClick={() => {
          onNext(curPage + 1);
        }}
        disabled={disableNext}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default PaginationSingle;
