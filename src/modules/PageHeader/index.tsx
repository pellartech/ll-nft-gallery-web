"use client"
import Image from 'next/image';

interface PageHeaderProps {
    thumbRadius?: 'sm' | 'lg'
    bannerUrl?: string;
    thumbUrl?: string;
}

const bannerDefault = '/images/profile_banner.png';
const thumbDefault = '/images/profile_thumb.png';

const PageHeader = ({ bannerUrl, thumbUrl, thumbRadius = 'lg' }: PageHeaderProps) => {
    return (
        <div className="absolute inset-0 top-0 left-0 h-80 w-screen z-0">
            <div className="absolute inset-x-0 top-0 h-80 w-screen">
                <img
                    src={bannerUrl || bannerDefault}
                    alt="Banner"
                    className="w-screen h-80 object-fill"
                />
            </div>
            <div className=" h-36 max-w-7xl z-10 relative m-auto mt-64">
                <img
                    src={thumbUrl || thumbDefault}
                    alt="Thumbnail"
                    className={`border-8 h-full w-36 ${thumbRadius === 'lg' ? 'rounded-full' : 'rounded-xl'}`}
                />
            </div>
        </div>
    )
}

export default PageHeader;
