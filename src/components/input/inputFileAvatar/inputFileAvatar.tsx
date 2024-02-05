import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

export const InputFileAvatar: React.FC = () => {
    const [uploadState, setUploadState] = useState<UploadState>('idle');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        if (uploadState === 'idle' && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        setUploadState('uploading');
        // TODO: Implement the file upload logic
        // Simulate upload process
        setTimeout(() => setUploadState('success'), 2000);
    };

    const handleCancel = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset file input
        }
        setImagePreview(null);
        setUploadState('idle');
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    const buttonClass = classNames('flex size-16 items-center justify-center rounded-full', {
        'bg-neutral-0 border-[1px] border-neutral-100 border-dashed cursor-pointer': uploadState === 'idle',
        'bg-yellow-500 text-white cursor-default': uploadState === 'uploading',
        'bg-green-500 cursor-default border-[5px] border-primary-400 border-dashed': uploadState === 'success',
        'bg-red-500 text-white': uploadState === 'error',
    });

    return (
        <>
            <button className={buttonClass} onClick={handleAvatarClick}>
                {uploadState === 'success' && imagePreview ? (
                    <div className="relative">
                        <Avatar src={imagePreview} size="lg" className="border-[1px] border-neutral-100" />
                        <button
                            onClick={handleCancel}
                            className="absolute -right-1 -top-1 cursor-pointer rounded-full bg-neutral-0 p-1 shadow-neutral"
                        >
                            <Icon icon={IconType.CLOSE} size="sm" />
                        </button>
                    </div>
                ) : (
                    <>
                        {uploadState === 'idle' && <Icon icon={IconType.ADD} size="lg" className="text-neutral-400" />}
                        {uploadState === 'uploading' && <Spinner size="lg" variant="neutral" />}
                        {uploadState === 'error' && 'Error'}
                    </>
                )}
            </button>
            <input
                type="file"
                id="file-upload"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                disabled={uploadState === 'uploading' || uploadState === 'success'}
            />
        </>
    );
};
