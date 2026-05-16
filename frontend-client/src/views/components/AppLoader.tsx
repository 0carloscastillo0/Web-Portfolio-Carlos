// Component for the loading screen while the app is initializing
const AppLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-text border-t-transparent rounded-full animate-spin" />

            <h1 className="text-text text-lg tracking-[0.3em] uppercase">
            Loading
            </h1>

      </div>
    </div>
  )
}

export default AppLoader