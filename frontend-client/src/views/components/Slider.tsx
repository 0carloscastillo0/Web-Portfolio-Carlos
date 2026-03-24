import { useRef, useState } from "react"
import { iconMap } from "../../utils/iconMap"

type Props<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}

function Slider<T>({ items, renderItem }: Props<T>) {
  const [current, setCurrent] = useState(0)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const total = items.length

    const LeftIcon = iconMap.chevronLeft
    const RightIcon = iconMap.chevronRight

  const next = () => setCurrent((prev) => (prev + 1) % total)
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) next()
    if (diff < -50) prev()
  }

  if (total === 0) return null

  return (
    <div className="w-full flex flex-col items-center gap-4">

      {/* WRAPPER */}
      <div className="relative w-full md:px-12">

        {/* SLIDER */}
        <div
          className="w-full overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0">
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>

        {/* ARROWS */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full surface-primary border border-soft"
            >
              {LeftIcon && <LeftIcon size={20} />}
            </button>

            <button
              onClick={next}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full surface-primary border border-soft"
            >
              {RightIcon && <RightIcon size={20} />}
            </button>
          </>
        )}

      </div>

      {/* DOTS */}
      {total > 1 && (
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
                w-2.5 h-2.5 rounded-full
                ${index === current ? "bg-accent" : "bg-secondary"}
              `}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default Slider