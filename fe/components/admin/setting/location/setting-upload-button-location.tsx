"use client";
import CsvInput from "@/components/form/csv-input";

const SettingUploadButtonLocation = () => {
  const handleCSV = (data: string) => {
    const items = data.split("\n");
    //      0  _Mới
    // 1  WardID_Mới
    // 2  WardName
    // 3  WardName_Mới
    // 4  DistrictID
    // 5  DistrictName
    // 6  ProvinceID
    // 7  ProvinceID_Mới
    // 8  ProvinceName
    // 9  ProvinceName_Mới
    // 10  Version
    // 11  Status
    // 12  FullMerger
    let locations: any[] = [];
    items
      .filter((v, i) => {
        return i != 0;
      })
      .forEach((locationRow) => {
        let location = locationRow.split(",");
        //    	public required string WardID { get; set; }
        //public required string WardName { get; set; }
        //public required string ProvinceID { get; set; }
        //public required string ProvinceName { get; set; }
        locations.push({
          wardID: location[1],
          wardName: location[3],
          provinceID: location[7],
          provinceName: location[9],
        });
      });

    fetch("/api/admin/location/backup", {
      method: "POST",
      body: JSON.stringify(locations),
    }).then((v) => {});
  };
  return <CsvInput onChange={handleCSV} />;
};

export default SettingUploadButtonLocation;
