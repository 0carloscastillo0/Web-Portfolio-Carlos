import type { ReactNode } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

interface Props {
  id: string
  children: ReactNode
}

const LazyRenderSection = ({ id, children }: Props) => {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  })

  return (
    <section
      id={id}
      ref={ref}
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={
          inView
            ? {
                opacity: 1,
                y: 0,
              }
            : {}
        }
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>

    </section>
  )
}

export default LazyRenderSection