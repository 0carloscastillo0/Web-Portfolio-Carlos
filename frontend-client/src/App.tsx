import Header from "./layouts/Header"
import Footer from "./layouts/Footer"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Header />

      <main className="flex-grow">
        {/* Contenido irá aquí */}
      </main>

      <Footer />
    </div>
  )
}

export default App