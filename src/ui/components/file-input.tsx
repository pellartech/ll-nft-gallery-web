import { useRef, useState, ChangeEvent, ReactNode, useEffect } from 'react';

interface FileInputProps {
    accept: string;
    defaultImage: string;
    imageClass: string;
    onFileChange: (file: File | null) => void;
    children?: ReactNode;
    label?: string;
}

const FileInput = ({ accept, defaultImage, onFileChange, children, label, imageClass = '' }: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string>(defaultImage);
    useEffect(() => setPreview(defaultImage), [defaultImage])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        } else {
            setPreview(defaultImage);
        }

        onFileChange(file);
    };

    const triggerFileInput = () => {
        inputRef.current?.click();
    };

    return (
        <div className="mt-4">
            {label &&
                <label className="block text-sm font-medium leading-6 text-grey-80">
                    {label}
                </label>
            }
            <input
                type="file"
                accept={accept}
                onChange={handleFileChange}
                ref={inputRef}
                className="hidden"
            />
            <div className={`overflow-hidden ${imageClass}`}>
                <img className={`object-cover cursor-pointer w-full h-full`} src={preview} alt="preview" onClick={triggerFileInput} />
            </div>
            {children}
        </div>
    );
};

export default FileInput;
