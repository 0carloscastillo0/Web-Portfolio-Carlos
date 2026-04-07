import Header from "./views/layouts/header/Header"
import Footer from "./views/layouts/footer/Footer"

import Home from "./views/sections/home/Home"
import About from "./views/sections/about/About"
import Projects from "./views/sections/projects/Projects"

import { PortfolioProvider } from "./contexts/PortfolioContext"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-primary text-text transition-colors duration-300">

      <Header />

      <main className="flex-1 px-6 lg:px-12">
        <PortfolioProvider>
          <Home />
          <About />
          <Projects />
        </PortfolioProvider>
      </main>

      <Footer />

    </div>
  )
}

export default App