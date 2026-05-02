"use client";

import { iLocation } from "@/components/location/interface";
import { useEffect, useMemo, useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
interface iLocationInputProps {
  value: string;
  onChange(value: string): void;
  error?: boolean;
}
const LocationInput = ({
  onChange,
  value,
  error = false,
}: iLocationInputProps) => {
  const [provinces, setProvinces] = useState<iLocation[]>([]);
  const [wards, setWards] = useState<iLocation[]>([]);

  const [province, setProvince] = useState<string>();
  const [ward, setWard] = useState<string>();

  useEffect(() => {
    fetch("/api/location")
      .then((v) => {
        return v.json();
      })
      .then((v) => {
        setProvinces(v);
      });
  }, []);

  useEffect(() => {
    let ss = value.split(",");
    setWard(ss[ss.length - 2] || "");
    setProvince(ss[ss.length - 1] || "");
  }, [value]);
  const wardHandle = (provinceid: string) => {
    fetch(`/api/location?locationId=${provinceid}`)
      .then((v) => {
        return v.json();
      })
      .then((v) => {
        setWards(v);
      });
  };
  return (
    <div className="flex items-center text-sm leading-5 ">
      <div
        data-error={error && ward == ""}
        className="flex p-2 w-full bg-white border-2 data-[error=false]:border-white data-[error=true]:border-f rounded-lg items-center gap-x-2.5"
      >
        <p className="capitalize">xã</p>
        <Combobox
          items={wards}
          defaultInputValue={ward}
          itemToStringLabel={(item: iLocation) => item.locationName}
          onValueChange={(v) => {
            setWard(v?.locationName);
            onChange(`,${v?.locationName},${province}`);
          }}
        >
          <ComboboxInput
            placeholder="Chọn xã phường"
            className="flex-1 w-full"
            disabled={wards.length == 0}
          />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList className={"h-100"}>
              {(item: iLocation) => (
                <ComboboxItem key={item.locationId} value={item}>
                  {item.locationName}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div
        data-error={error && province == ""}
        className="flex p-2 w-full bg-white border-2 data-[error=false]:border-white data-[error=true]:border-f rounded-lg items-center gap-x-2.5"
      >
        <p className="capitalize">Tỉnh</p>
        <Combobox
          itemToStringLabel={(v: any) => v.locationName}
          items={provinces}
          defaultInputValue={province}
          onValueChange={(value: iLocation) => {
            wardHandle(value.locationId);
            setProvince(value.locationName);
            onChange(`,${ward},${value.locationName}`);
          }}
        >
          <ComboboxInput
            placeholder="Chọn tỉnh"
            disabled={provinces.length == 0}
          />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item: iLocation) => (
                <ComboboxItem key={item.locationId} value={item}>
                  {item.locationName}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
};

export default LocationInput;
