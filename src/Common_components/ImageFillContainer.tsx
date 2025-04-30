import Image from 'next/image';
import React from 'react'

interface ImageFillContainerProps {
  src: string;
  alt: string;
  quality: number;

}

const ImageFillContainer = ({ src, alt, quality }: ImageFillContainerProps) => {
 return (
    <div className="relative w-full h-64">
      <Image
        src={src}
        alt={alt}
        quality={quality}      
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-xl"
      />
    </div>
  )
}

export default ImageFillContainer