import Modal from "@/views/components/Modal"

type Props = {
    onClose: () => void
    urlES?: string
    urlEN?: string
    t: (key: string) => string
}

function DownloadCVModal({ onClose, urlES, urlEN, t }: Props) {
    return (
        <Modal onClose={onClose}>
            <div data-testid="cv-modal" className="text-center space-y-6">

                <h3 className="text-subtitle text-accent font-bold text-center">
                    {t("cv.selectLanguage")}
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">

                    {urlES && (
                        <a
                            href={urlES}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="px-5 py-2 bg-accent rounded-xl text-sm font-semibold text-white text-center"
                        >
                            {t("cv.spanish")}
                        </a>
                    )}

                    {urlEN && (
                        <a
                            href={urlEN}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="px-5 py-2 border border-accent text-accent rounded-xl text-sm font-semibold text-center"
                        >
                            {t("cv.english")}
                        </a>
                    )}

                </div>
            </div>
        </Modal>
    )
}

export default DownloadCVModal