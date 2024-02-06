import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';
import { useInputProps } from '../hooks';
import { InputContainer } from '../inputContainer';
import { IInputContainerAlert } from '../inputContainer/inputContainer.api';
import { UploadState } from './inputFileAvatar.api';

export const InputFileAvatar: React.FC = (props) => {
    const [uploadState, setUploadState] = useState<UploadState>(UploadState.IDLE);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<IInputContainerAlert | undefined>(undefined);
    const { containerProps, inputProps } = useInputProps(props);
    /**
     * adjust the first nubmer to change the max file size by megabyte
     */
    const MAX_FILE_SIZE = 2 * 1024 ** 2;
    const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif'];

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = useCallback(() => {
        if (uploadState === UploadState.IDLE || uploadState === UploadState.ERROR) {
            fileInputRef.current?.click();
        }
    }, [uploadState]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            if (event.target) {
                event.target.value = '';
            }
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setUploadError({ message: 'File is too large. Max size is 2 MiB.', variant: 'critical' });
            setUploadState(UploadState.ERROR);
            return;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setUploadError({ message: 'Invalid file type. Only JPEG and PNG are allowed.', variant: 'critical' });
            setUploadState(UploadState.ERROR);
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        setUploadState(UploadState.UPLOADING);
        setUploadError(null);
        // TODO: Implement the file upload logic
        // Simulate upload process
        setTimeout(() => {
            const uploadSuccess = Math.random() > 0.001; // Simulate a 75% chance of failure
            if (uploadSuccess) {
                setUploadState(UploadState.SUCCESS);
                setUploadError(undefined);
            } else {
                setUploadState(UploadState.ERROR);
                setUploadError('Upload failed. Please try again.');
            }
        }, 2000);
        event.target.value = '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCancel = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setImagePreview(null);
        setUploadState(UploadState.IDLE);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    const uploaderVariantStateClasses = classNames(
        'flex size-16 items-center justify-center rounded-full hover:shadow-neutral focus:outline-none focus-visible:ring  focus-visible:ring-offset', // Default
        {
            ['bg-neutral-0 border-[1px] border-neutral-100 border-dashed cursor-pointer focus-visible:ring-primary']:
                uploadState === UploadState.IDLE, // IDLE State
            ['bg-neutral-0 cursor-default border-[1px] border-primary-400 focus-visible:ring-primary']:
                uploadState === UploadState.UPLOADING, // UPLOADING State
            ['cursor-default border-[5px] border-primary-400 border-dashed focus-visible:ring-primary']:
                uploadState === UploadState.SUCCESS, // SUCCESS State
            ['bg-critical-100 border-[1px] border-critical-200 border-dashed cursor-pointer focus-visible:ring-critical']:
                uploadState === UploadState.ERROR, // ERROR State
        },
    );

    return (
        <div className="flex flex-col items-start gap-y-2">
            <button className={uploaderVariantStateClasses} onClick={handleAvatarClick}>
                {uploadState === 'success' && imagePreview ? (
                    <div className="relative">
                        <Avatar src={imagePreview} size="lg" className="border-[1px] border-neutral-100" />
                        <button
                            onClick={handleCancel}
                            className="absolute -right-1 -top-1 cursor-pointer rounded-full bg-neutral-0 p-1 shadow-neutral focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset"
                        >
                            <Icon icon={IconType.CLOSE} size="sm" />
                        </button>
                    </div>
                ) : (
                    <>
                        {uploadState === UploadState.IDLE && (
                            <Icon icon={IconType.ADD} size="lg" className="text-neutral-400 hover:text-neutral-600" />
                        )}
                        {uploadState === UploadState.UPLOADING && <Spinner size="lg" variant="neutral" />}
                        {uploadState === UploadState.ERROR && (
                            <Icon icon={IconType.RADIO_CANCEL} size="lg" className="text-critical-400" />
                        )}
                    </>
                )}
            </button>
            <InputContainer
                alert={uploadError && { message: uploadError.message, variant: 'critical' }}
                {...containerProps}
            >
                <input
                    type="file"
                    id="file-upload"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploadState === 'uploading' || uploadState === 'success'}
                    {...inputProps}
                />
            </InputContainer>
            {!!uploadError && <p className="text-xs text-critical-400">{}</p>}
        </div>
    );
};
