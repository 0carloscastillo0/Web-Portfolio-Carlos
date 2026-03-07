import Header from "./layouts/Header"
import Footer from "./layouts/Footer"

import Home from "./sections/Home"
import About from "./sections/About"
import Projects from "./sections/Projects"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-primary text-text transition-colors duration-300">
      <Header />

      <main className="flex-1">
        <Home />
        <About />
        <Projects />
      </main>

      <Footer />
    </div>
  )
}

export default App