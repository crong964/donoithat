"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { iLatLng } from "./interface";

export default function MapLeafLet(p: {
  onChange?(lat: number, lng: number): void;
  latlng?: iLatLng;
}) {
  const refmap = useRef<any>(null);
  useEffect(() => {
    const f = async () => {
      const latlng = p.latlng;
      const L = await import("leaflet");
      var greenIcon = L.icon({
        className: "",
        iconUrl: "/map-pin.svg",
        iconSize: [20, 95], // size of the icon
      });
      let mark: L.Marker = new L.Marker(
        [latlng?.lat || 10.906132709550574, latlng?.lng || 106.8849634786165],
        {
          alt: "vị trí của bạn",
          draggable: p.onChange != undefined,
          icon: greenIcon,
        }
      );
      mark.on("dragend", (ev) => {
        if (p.onChange == undefined) {
          return;
        }
        p.onChange(mark.getLatLng().lat, mark.getLatLng().lng);
      });

      var MyCustomControl = L.Control.extend({
        onAdd: function (maps: L.Map) {
          var div = L.DomUtil.create("div");
          div.innerHTML =
            '<p class="bg-white p-2 cursor-pointer rounded-full"><img src="/locate-fixed.svg"/></p>';
          div.onclick = () => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const v = position.coords;
                if (mark != undefined) {
                  mark.setLatLng([v.latitude, v.longitude]);
                } else {
                  mark = new L.Marker([v.latitude, v.longitude], {
                    alt: "vị trí của bạn",
                    draggable: true,
                  });
                }
                maps.addLayer(mark);
                maps.setView([v.latitude, v.longitude], 20);
              },
              (err) => {
                switch (err.code) {
                  case 1:
                    toast.error("Bạn chưa cấp quyền");
                    break;
                  case 2:
                    toast.error("Không thể lấy được vị trí");
                    break;
                  case 3:
                    toast.error("Qua thời gian");
                    break;
                }
              }
            );
          };
          return div;
        },

        onRemove: function () {
          // Nothing to do here
        },
      });

      const map = L.map("maps").setView(
        [latlng?.lat || 10.906132709550574, latlng?.lng || 106.8849634786165],
        13
      );
      const tiles = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(map);
      var myControl = new MyCustomControl({ position: "topright" });
      map.addControl(myControl);
      map.addLayer(mark);
    };
    f();
    return () => {};
  }, []);
  return (
    <div className="py-3.75">
      <div id="maps" ref={refmap} className="h-80 w-120"></div>
    </div>
  );
}
