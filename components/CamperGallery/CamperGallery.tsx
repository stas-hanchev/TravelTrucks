'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'

import styles from './CamperGallery.module.css'

interface GalleryImage {
    id: string | number
    thumb: string
    original: string
}

interface CamperGalleryProps {
    images: GalleryImage[]
    camperName: string
}

export default function CamperGallery({
    images,
    camperName,
}: CamperGalleryProps) {
    const [isOpen, setIsOpen] = useState(false)

    // Зображення, яке показується на сторінці
    const [mainImageIndex, setMainImageIndex] = useState(0)

    // Зображення, з якого відкривається Lightbox
    const [lightboxIndex, setLightboxIndex] = useState(0)

    const slides = useMemo(
        () =>
            images.map((image, index) => ({
                src: image.original,
                alt: `${camperName}, image ${index + 1}`,
            })),
        [images, camperName]
    )

    if (images.length === 0) {
        return null
    }

    const openGallery = (index: number) => {
        setLightboxIndex(index)
        setIsOpen(true)
    }

    return (
        <>
            <div className={styles.gallery}>
                <button
                    type="button"
                    className={styles.mainPictureButton}
                    onClick={() => openGallery(mainImageIndex)}
                    aria-label="Open camper gallery"
                >
                    <Image
                        className={styles.mainPicture}
                        width={638}
                        height={505}
                        src={images[mainImageIndex].original}
                        alt={`${camperName}, main image`}
                        priority
                    />
                </button>

                <div className={styles.thumbnails}>
                    {images.map((image, index) => (
                        <button
                            key={`${image.id}-${image.original}`}
                            type="button"
                            className={`${styles.thumbnailButton} ${
                                mainImageIndex === index
                                    ? styles.activeThumbnail
                                    : ''
                            }`}
                            onClick={() => setMainImageIndex(index)}
                            aria-label={`Show image ${index + 1}`}
                        >
                            <Image
                                className={styles.thumbnail}
                                src={image.thumb}
                                width={136}
                                height={144}
                                alt={`${camperName}, image ${index + 1}`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                index={lightboxIndex}
                slides={slides}
                controller={{
                    closeOnBackdropClick: true,
                }}
            />
        </>
    )
}