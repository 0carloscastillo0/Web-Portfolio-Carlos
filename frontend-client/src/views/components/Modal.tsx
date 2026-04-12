import { useEffect, useRef, useState } from "react"
import { iconMap } from "@/utils/iconMap"

type Props = {
  children: React.ReactNode
  onClose: () => void
}

function Modal({ children, onClose }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const startYRef = useRef(0)
  const currentTranslateRef = useRef(0)

  // ================= DETECT MOBILE =================
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // ================= BLOCK SCROLL =================
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // ================= OPEN =================
  useEffect(() => {
    if (isMobile) {
      setTranslateY(0)
    } else {
      setIsVisible(true)
    }
  }, [isMobile])

  // ================= CLOSE =================
  const handleClose = () => {
    if (isMobile) {
      setTranslateY(window.innerHeight)
      setTimeout(onClose, 300)
    } else {
      setIsVisible(false)
      setTimeout(onClose, 200)
    }
  }

  // ================= ESC KEY SUPPORT =================
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // ================= DRAG =================
  useEffect(() => {
    if (!isMobile) return

    const sheet = sheetRef.current
    const content = contentRef.current
    if (!sheet || !content) return

    // Touch events for dragging the sheet
    const onTouchStart = (e: TouchEvent) => {
      startYRef.current = e.touches[0].clientY
      currentTranslateRef.current = translateY
      setIsDragging(true)
    }
    
    // Prevent dragging when content can scroll
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return

      const currentY = e.touches[0].clientY
      const diff = currentY - startYRef.current

      if (content.scrollTop <= 0 && diff > 0) {
        e.preventDefault()
        const next = currentTranslateRef.current + diff
        setTranslateY(next)
      }
    }

    // End dragging and determine if we should close or snap back
    const onTouchEnd = () => {
      setIsDragging(false)

      if (translateY > window.innerHeight * 0.25) {
        handleClose()
      } else {
        setTranslateY(0)
      }
    }

    // Attach listeners
    sheet.addEventListener("touchstart", onTouchStart, { passive: true })
    sheet.addEventListener("touchmove", onTouchMove, { passive: false })
    sheet.addEventListener("touchend", onTouchEnd)

    return () => {
      sheet.removeEventListener("touchstart", onTouchStart)
      sheet.removeEventListener("touchmove", onTouchMove)
      sheet.removeEventListener("touchend", onTouchEnd)
    }
  }, [isMobile, isDragging, translateY])

  return (
    <div
      aria-modal="true"
      role="dialog"
      className={`
        fixed inset-0 z-50
        flex items-end md:items-center justify-center
        backdrop-blur-sm
        ${!isMobile ? "transition-opacity duration-300" : ""}
        ${!isMobile && isVisible ? "opacity-100" : ""}
        ${!isMobile && !isVisible ? "opacity-0" : ""}
      `}
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      {/* OVERLAY CLICK AREA */}
      <div
        className="absolute inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={sheetRef}
        className={`
          relative
          w-full md:w-[90%] md:max-w-6xl
          h-[85vh] md:h-auto md:max-h-[90vh]
          surface-primary
          border border-soft
          shadow-2xl
          flex flex-col
          overflow-hidden
          transition-all duration-300

          ${isMobile ? "rounded-t-2xl" : "rounded-2xl"}
          ${!isMobile && isVisible ? "scale-100 opacity-100" : ""}
          ${!isMobile && !isVisible ? "scale-95 opacity-0" : ""}
        `}
        style={
          isMobile
            ? {
                transform: `translateY(${translateY}px)`,
                transition: isDragging
                  ? "none"
                  : "transform 0.3s ease"
              }
            : undefined
        }
      >
        {/* HANDLE */}
        {isMobile && (
          <div className="w-full flex justify-center py-3">
            <div className="w-12 h-1.5 bg-secondary rounded-full" />
          </div>
        )}

        {/* CLOSE DESKTOP */}
        {!isMobile && (
          <button
            aria-label="Close modal"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary"
          >
            <iconMap.close size={24} />
          </button>
        )}

        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-6 py-6 pb-8"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal