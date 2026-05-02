import { Button } from "@/components/ui/button";
import { CloudDownload } from "lucide-react";
import Link from "next/link";

const SettingDownloadButtonLocation = () => {
  return (
    <Link href={"/api/admin/location/backup"} download>
      <Button variant={"blue"}>
        <CloudDownload />
        <p>Tải xuống</p>
      </Button>
    </Link>
  );
};

export default SettingDownloadButtonLocation;
