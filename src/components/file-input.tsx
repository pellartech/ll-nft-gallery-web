import { useRef, useState, ChangeEvent, ReactNode } from 'react';

interface FileInputProps {
    accept: string;
    defaultImage: string;
    onFileChange: (file: File | null) => void;
    children?: ReactNode;
    label?: string;
}

const FileInput = ({ accept, defaultImage, onFileChange, children, label }: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string>(defaultImage);

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
        <>
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
            <img className="object-cover w-full h-full cursor-pointer mb-8" src={preview} alt="preview" onClick={triggerFileInput} />
            {children}
        </>
    );
};

export default FileInput;
