import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { ErrorCode, useDropzone, type FileRejection } from 'react-dropzone';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';
import { useInputProps } from '../hooks';
import { InputContainer } from '../inputContainer';
import { type IInputContainerAlert } from '../inputContainer/inputContainer.api';
import { SelectState, type IInputFileAvatarProps } from './inputFileAvatar.api';

export const InputFileAvatar: React.FC<IInputFileAvatarProps> = ({
    onFileSelect,
    maxFileSize = 0,
    minDimension = 0,
    maxDimension = 0,
    onlySquare = true,
    ...otherProps
}) => {
    const [selectState, setSelectState] = useState<SelectState>(SelectState.IDLE);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectError, setSelectError] = useState<IInputContainerAlert | undefined>(undefined);

    const { containerProps } = useInputProps(otherProps);
    const { id, alert, isDisabled, ...otherContainerProps } = containerProps;

    const MAX_FILE_SIZE = maxFileSize * 1024 ** 2;
    const ALLOWED_FILE_TYPES = { 'image/*': ['.png', '.jpeg', '.jpg'] };
    const ERROR_MESSAGES = {
        TOO_LARGE: `Max file size is ${maxFileSize} MiB.`,
        FILE_TYPE: 'Only JPEG and PNG images accepted.',
        QUANTITY: 'Only one file can be uploaded at a time.',
        ONLY_SQUARE: `Must be square dimensions.`,
        WRONG_DIMENSION: `Either dimension must be ${minDimension === 0 ? '0' : minDimension}px ↔ ${maxDimension === 0 ? 'unlimited ' : maxDimension}px.`,
        FAILED: 'Image selection failed. Please try again.',
    };

    const setCriticalSelectError = (message: string) => {
        setSelectError({ message, variant: 'critical' });
    };

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (acceptedFiles.length > 1 || rejectedFiles.length > 1) {
                setCriticalSelectError(ERROR_MESSAGES.QUANTITY);
                setSelectState(SelectState.ERROR);
                return;
            }

            let errorMessage = '';

            if (rejectedFiles.length > 0) {
                const errors = rejectedFiles[0].errors;

                if (errors.some((error) => error.code === ErrorCode.FileInvalidType)) {
                    errorMessage = ERROR_MESSAGES.FILE_TYPE;
                } else if (errors.some((error) => error.code === ErrorCode.FileTooLarge)) {
                    errorMessage = ERROR_MESSAGES.TOO_LARGE;
                } else {
                    errorMessage = ERROR_MESSAGES.FAILED;
                }

                if (errorMessage !== '') {
                    setCriticalSelectError(errorMessage);
                    setSelectState(SelectState.ERROR);
                    return;
                }
            }

            const file = acceptedFiles[0];

            const image = new Image();
            const onImageLoad = () => {
                const isBelowMinDimension =
                    minDimension > 0 && (image.width < minDimension || image.height < minDimension);
                const isAboveMaxDimension =
                    maxDimension > 0 && (image.width > maxDimension || image.height > maxDimension);
                if (onlySquare && image.height !== image.width) {
                    setCriticalSelectError(ERROR_MESSAGES.ONLY_SQUARE);
                    setSelectState(SelectState.ERROR);
                } else if (isBelowMinDimension || isAboveMaxDimension) {
                    setCriticalSelectError(ERROR_MESSAGES.WRONG_DIMENSION);
                    setSelectState(SelectState.ERROR);
                } else {
                    setImagePreview(image.src);
                    setSelectState(SelectState.SUCCESS);
                    setSelectError(undefined);
                    onFileSelect?.(file);
                }
            };

            image.addEventListener('load', onImageLoad);
            image.addEventListener('error', () => {
                setCriticalSelectError(ERROR_MESSAGES.FAILED);
                setSelectState(SelectState.ERROR);
            });
            image.src = URL.createObjectURL(file);
        },
        [
            ERROR_MESSAGES.FAILED,
            ERROR_MESSAGES.FILE_TYPE,
            ERROR_MESSAGES.QUANTITY,
            ERROR_MESSAGES.TOO_LARGE,
            ERROR_MESSAGES.WRONG_DIMENSION,
            ERROR_MESSAGES.ONLY_SQUARE,
            maxDimension,
            minDimension,
            onFileSelect,
            onlySquare,
        ],
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: ALLOWED_FILE_TYPES,
        ...(maxFileSize > 0 && { maxSize: MAX_FILE_SIZE }),
        disabled: isDisabled ?? selectState === SelectState.SELECTING,
        onDrop,
    });

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setImagePreview(null);
        setSelectState(SelectState.IDLE);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    const selecterVariantStateClasses = classNames(
        'group flex size-16 items-center justify-center rounded-full bg-neutral-0 hover:shadow-neutral focus:outline-none focus-visible:ring  focus-visible:ring-offset', // Default
        {
            ['border-[1px] border-neutral-100 hover:border-neutral-200 border-dashed cursor-pointer focus-visible:ring-primary']:
                selectState === SelectState.IDLE, // IDLE State
            ['cursor-default border-[1px] border-primary-400 focus-visible:ring-primary']:
                selectState === SelectState.SELECTING, // SELECTING State
            ['cursor-default border-[5px] border-neutral-100 border-dashed focus-visible:ring-primary']:
                selectState === SelectState.SUCCESS, // SUCCESS State
            ['border-[1px] border-critical-500 hover:border-critical-600 border-dashed cursor-pointer focus-visible:ring-critical']:
                selectState === SelectState.ERROR, // ERROR State
        },
    );

    return (
        <>
            <InputContainer id={id} alert={selectError} invisible {...otherContainerProps}>
                <div {...getRootProps()} className={selecterVariantStateClasses} aria-label="Select File">
                    <input {...getInputProps()} id={id} type="file" aria-label="Avatar Image Select" />
                    {selectState === SelectState.SUCCESS && imagePreview ? (
                        <div className="relative">
                            <Avatar src={imagePreview} size="lg" className="cursor-pointer" data-testid="avatar" />
                            <button
                                onClick={handleCancel}
                                className={classNames(
                                    'absolute -right-1 -top-1 cursor-pointer rounded-full bg-neutral-0 p-1 shadow-neutral focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
                                )}
                                aria-label="Cancel Selection"
                            >
                                <Icon icon={IconType.CLOSE} size="sm" />
                            </button>
                        </div>
                    ) : (
                        <>
                            {selectState === SelectState.IDLE && (
                                <Icon
                                    icon={IconType.ADD}
                                    size="lg"
                                    className="text-neutral-400 group-hover:text-neutral-600"
                                />
                            )}
                            {selectState === SelectState.SELECTING && <Spinner size="lg" variant="neutral" />}
                            {selectState === SelectState.ERROR && (
                                <Icon
                                    icon={IconType.ADD}
                                    size="lg"
                                    className="text-critical-500 group-hover:text-critical-600"
                                />
                            )}
                        </>
                    )}
                </div>
            </InputContainer>
        </>
    );
};
