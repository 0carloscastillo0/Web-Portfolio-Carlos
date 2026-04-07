type CardProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

function Card({ children, onClick, className = "" }: CardProps) {
  const isClickable = !!onClick

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!isClickable) return
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      className={`
        rounded-xl
        border border-soft
        surface-secondary
        transition-all duration-300
        hover:bg-secondary
        ${isClickable ? "cursor-pointer hover:scale-[1.02]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card