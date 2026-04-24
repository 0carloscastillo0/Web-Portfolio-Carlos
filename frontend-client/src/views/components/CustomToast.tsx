// Imports
import { useEffect } from "react"
import { iconMap } from "@/utils/iconMap"

// Custom toast props for notifications
type CustomToastProps = {
    type: "success" | "error"
    message: string
    onClose: () => void
    duration?: number
}

// Simple toast component for notifications (4 seconds auto-dismiss)
function CustomToast({
    type,
    message,
    onClose,
    duration = 4000
}: CustomToastProps) {

    // Auto dismiss
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timeout)
    }, [onClose, duration])

    // Render
    return (
        <div
            className={`fixed bottom-6 right-6 w-80 rounded-xl shadow-lg text-white animate-fade-in ${
                type === "success"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
        >
            <div className="flex items-start justify-between p-4">
                
                {/* MESSAGE */}
                <p className="text-sm pr-4">
                    {message}
                </p>

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition"
                >
                    <iconMap.close size={20} />
                </button>

            </div>
        </div>
    )
}

export default CustomToast