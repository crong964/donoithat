import { iLatLng } from "@/components/address/interface";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "@/components/ui/button";
import MapLeafLet from "@/components/address/map-leafLet";

export default function LeafletButtom(p: { data: iLatLng, text: string }) {

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <p className="text-f cursor-pointer">
                        <span className="font-bold pr-3">Địa chỉ:</span> {p.text}
                    </p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Đại chỉ của khác hàng</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <div>
                                <div>
                                    {p.text}
                                </div>
                                <MapLeafLet latlng={{ lat: p.data.lat, lng: p.data.lng }} />
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Đóng</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}