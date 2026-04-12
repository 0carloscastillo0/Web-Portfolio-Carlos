type CardProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

function Card({ children, onClick, className = "" }: CardProps) {
  const isClickable = !!onClick

  if (isClickable) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          w-full
          text-left
          appearance-none
          bg-transparent
          flex flex-col
          rounded-xl
          border border-soft
          surface-secondary
          transition-all duration-300
          hover:bg-secondary
          cursor-pointer hover:scale-[1.02]

          ${className}
        `}
      >
        {children}
      </button>
    )
  }

  return (
    <div
      className={`
        rounded-xl
        border border-soft
        surface-secondary

        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card