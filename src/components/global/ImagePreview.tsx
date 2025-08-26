'use client';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface ImagePreviewProps {
    src: string;
    alt?: string;
    className?: string
}

const ImagePreview = ({ src, alt = '', className }: ImagePreviewProps) => {
    return (
        <PhotoProvider>
            <PhotoView src={src}>
                <img
                    src={src}
                    alt={alt}
                    className={className ?? 'w-32 h-32 object-cover rounded cursor-pointer'}
                    loading='lazy'
                />
            </PhotoView>
        </PhotoProvider>
    );
}
export default ImagePreview;
