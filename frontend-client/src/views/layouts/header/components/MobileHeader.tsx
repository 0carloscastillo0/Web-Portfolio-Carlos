import { X, Menu } from "lucide-react"

type Props = {
  mobileMenuOpen: boolean
  onToggleMenu: () => void
}

function MobileHeader({ mobileMenuOpen, onToggleMenu }: Props) {
  return (
    <div className="flex md:hidden w-full items-center justify-between">

      <div className="w-8" />

      <h1 className="text-lg font-bold text-accent text-center">
        Castillo Sites
      </h1>

      <button onClick={onToggleMenu}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

    </div>
  )
}

export default MobileHeader