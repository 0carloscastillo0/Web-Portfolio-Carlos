import Slider from "../../../components/Slider"
import type { ProjectImage } from "../../../../modules/portfolio.interface"

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