import { useEffect, useState } from "react"

import Header from "./views/layouts/header/Header"
import Footer from "./views/layouts/footer/Footer"

import Home from "./views/sections/home/Home"
import About from "./views/sections/about/About"
import Projects from "./views/sections/projects/Projects"
import Contact from "./views/sections/contact/Contact"

import { PortfolioProvider } from "./contexts/PortfolioContext"

import LazyRenderSection from "./views/components/LazyRenderSection"
import AppLoader from "./views/components/AppLoader"

function App() {

  const [isLoading, setIsLoading] = useState(true)

  // Prevent scrolling while loading
  useEffect(() => {

    document.body.style.overflow =
      isLoading ? "hidden" : "auto"

  }, [isLoading])

  // Simulate loading state until all images are loaded
  useEffect(() => {

    const loadApp = async () => {
      // Wait for all images to load
      const images = Array.from(document.images)
      const imagePromises = images.map((img) => {

        if (img.complete) {
          return Promise.resolve()
        }

        return new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
        })

      })

      await Promise.all(imagePromises)

      // Small pause for visual smoothness
      setTimeout(() => {
        setIsLoading(false)
      }, 500)

    }

    loadApp()

  }, [])

  return (
    <PortfolioProvider>

      {isLoading && <AppLoader />}

      <div
        className={`
          min-h-screen flex flex-col bg-primary text-text
          transition-opacity duration-700
          ${isLoading ? "opacity-0" : "opacity-100"}
        `}
      >

        <Header />

        <main className="flex-1 px-6 lg:px-12">

          <LazyRenderSection id="home">
            <Home />
          </LazyRenderSection>

          <LazyRenderSection id="about">
            <About />
          </LazyRenderSection>

          <LazyRenderSection id="projects">
            <Projects />
          </LazyRenderSection>

          <LazyRenderSection id="contact">
            <Contact />
          </LazyRenderSection>

        </main>

        <Footer />

      </div>

    </PortfolioProvider>
  )
}

export default App