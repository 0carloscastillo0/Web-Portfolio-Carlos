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
        <div className="w-full h-[500px] flex items-center justify-center">
          <img
            src={img.url}
            alt=""
            className="max-h-full w-auto object-contain rounded-lg"
          />
        </div>
      )}
    />
  )
}

export default ProjectCarousel