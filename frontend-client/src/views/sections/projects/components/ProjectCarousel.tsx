import type { ProjectImage } from "@/modules/portfolio.interface"
import Slider from "@/views/components/Slider"

type Props = {
  images: ProjectImage[]
}

function ProjectCarousel({ images }: Props) {
  return (
    <Slider
      items={images}
      renderItem={(img) => (
        <img
          src={img.url}
          alt=""
          className="w-full object-cover h-64 md:h-80"
        />
      )}
    />
  )
}

export default ProjectCarousel