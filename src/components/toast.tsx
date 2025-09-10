import IconBuilder from "@/src/helpers/IconBuilder";
import { ToastInterface } from "../interface";

export default function toast({ message, status } : ToastInterface) {
    return (
        <div className="fixed bottom-5 z-50 max-w-xs">
                <div className={`text-sm text-white rounded-md shadow-lg px-2 ${status == "success" ? "bg-green-500" : "bg-red-500"}`} role="alert">
                    <div className="flex items-center p-4">
                        <IconBuilder type={status == "success" ? "check" : "close"} paint="h-4 w-4 mr-3" />
                        {message}
                    </div>
                </div>
        </div>
    )
}