type CardProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

function Card({ children, onClick, className = "" }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl
        border border-soft
        surface-secondary
        transition-all duration-300
        hover:bg-secondary
        ${onClick ? "cursor-pointer hover:scale-[1.02]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card