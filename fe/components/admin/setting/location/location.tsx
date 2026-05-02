"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import SettingUploadButtonLocation from "./setting-upload-button-location";
import SettingDownloadButtonLocation from "./setting-download-button-location";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { iLocation } from "@/components/location/interface";

const LocationPage = () => {
  const [provinces, setProvinces] = useState<iLocation[]>([]);
  const [wards, setWards] = useState<iLocation[]>([]);
  const [selectedPprovinceId, setSelectedPprovinceId] = useState("");
  useEffect(() => {
    fetch("/api/admin/location")
      .then((v) => {
        return v.json();
      })
      .then((v) => {
        setProvinces(v);
      });
  }, []);

  const wardHandle = (provinceid: string) => {
    fetch(`/api/admin/location?locationId=${provinceid}`)
      .then((v) => {
        return v.json();
      })
      .then((v) => {
        setWards(v);
      });
  };
  const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
  return (
    <div className="p-3.75">
      <div className="w-full lg:w-1/2 border rounded-lg p-2">
        <div className="flex gap-x-10 justify-between">
          <h1 className="text-lg font-bold mb-3">Hành chính công</h1>
          <div className="flex gap-x-2.5">
            <SettingDownloadButtonLocation />
            <SettingUploadButtonLocation />
          </div>
        </div>
        <div className=" text-sm leading-5 space-y-3">
          <div className="flex p-2 w-full bg-white items-center gap-x-2.5">
            <p className="capitalize">Tỉnh</p>
            <Select disabled={provinces.length == 0} onValueChange={wardHandle}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position={"popper"} className="flex-1 w-full">
                <SelectGroup>
                  {provinces.map((province) => {
                    return (
                      <SelectItem value={province.locationId}>
                        {province.locationName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex p-2 w-full bg-white items-center gap-x-2.5">
            <p className="capitalize">xã</p>
            <Combobox items={wards}>
              <ComboboxInput
                placeholder="Select a framework"
                showClear
                showTrigger
                className="flex-1 w-full"
                disabled={wards.length == 0}
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList className={"h-100 sm:w-100!"}>
                  {(item: iLocation) => (
                    <ComboboxItem
                      key={item.locationId}
                      value={item.locationName}
                    >
                      {item.locationName}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
