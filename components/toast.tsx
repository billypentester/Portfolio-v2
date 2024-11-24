import IconBuilder from "@/helpers/IconBuilder";

interface IToast {
    message: string;
    status: string
}

export default function toast({ message, status } : IToast) {
    return (
        <div className="fixed bottom-5 z-50 max-w-xs">
                <div className={`text-sm text-white rounded-md shadow-lg px-2 ${status == "success" ? "bg-green-500" : "bg-red-500"}`} role="alert">
                    <div className="flex items-center p-4">
                        <IconBuilder type={status == "success" ? "check" : "close"} paint="h-4 w-4 mr-3" />
                        {message}
                        {/* <div className="ml-3">
                            <button type="button" className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-baseline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-600 transition-all text-sm dark:focus:ring-offset-gray-900 dark:focus:ring-gray-800">
                                <span className="sr-only">Close</span>
                                <IconBuilder type="close" paint="h-3 w-3" />
                            </button>
                        </div> */}
                    </div>
                </div>
        </div>
    )
}