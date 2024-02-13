import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';
import { useInputProps } from '../hooks';
import { InputContainer } from '../inputContainer';
import { InputFileAvatarError, InputFileAvatarState, type IInputFileAvatarProps } from './inputFileAvatar.api';

const stateToClassNames: Record<InputFileAvatarState, { containerClasses: string[]; addIconClasses: string[] }> = {
    [InputFileAvatarState.IDLE]: {
        containerClasses: [
            'border-[1px] border-neutral-100 hover:border-neutral-200 border-dashed cursor-pointer focus-visible:ring-primary',
        ],
        addIconClasses: ['text-neutral-400 group-hover:text-neutral-600'],
    },
    [InputFileAvatarState.SELECTING]: {
        containerClasses: ['cursor-default border-[1px] border-primary-400 focus-visible:ring-primary'],
        addIconClasses: ['text-primary-400'],
    },
    [InputFileAvatarState.WARNING]: {
        containerClasses: [
            'border-[1px] border-warning-300 hover:border-warning-400 border-dashed cursor-pointer focus-visible:ring-warning',
        ],
        addIconClasses: ['text-warning-500 group-hover:text-warning-600'],
    },
    [InputFileAvatarState.SUCCESS]: {
        containerClasses: ['border-neutral-100 border-dashed focus-visible:ring-primary'],
        addIconClasses: ['text-success-500 group-hover:text-success-600'],
    },
    [InputFileAvatarState.ERROR]: {
        containerClasses: [
            'border-[1px] border-critical-500 hover:border-critical-600 border-dashed cursor-pointer focus-visible:ring-critical',
        ],
        addIconClasses: ['text-critical-500 group-hover:text-critical-600'],
    },
    [InputFileAvatarState.DISABLED]: {
        containerClasses: ['border-[1px] border-neutral-200'],
        addIconClasses: ['text-neutral-200'],
    },
};

const variantOverrideState: Record<string, InputFileAvatarState> = {
    warning: InputFileAvatarState.WARNING,
    critical: InputFileAvatarState.ERROR,
    disabled: InputFileAvatarState.DISABLED,
};

export const InputFileAvatar: React.FC<IInputFileAvatarProps> = ({
    onFileSelect,
    onFileError,
    maxFileSize,
    minDimension = 0,
    maxDimension = 0,
    acceptedFileTypes = { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
    onlySquare,
    variant,
    isDisabled,
    ...otherProps
}) => {
    const [currentState, setCurrentState] = useState(InputFileAvatarState.IDLE);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { containerProps } = useInputProps(otherProps);
    const { id, ...otherContainerProps } = containerProps;

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            setIsLoading(true);

            if (rejectedFiles.length > 0) {
                const error = rejectedFiles[0].errors[0].code;
                onFileError?.(error);
                setIsLoading(false);
                setCurrentState(InputFileAvatarState.ERROR);
                return;
            }

            const file = acceptedFiles[0];
            const image = new Image();
            const onImageLoad = () => {
                const isBelowMinDimension =
                    minDimension > 0 && (image.width < minDimension || image.height < minDimension);
                const isAboveMaxDimension =
                    maxDimension > 0 && (image.width > maxDimension || image.height > maxDimension);
                if (onlySquare && image.height !== image.width) {
                    onFileError?.(InputFileAvatarError.SQUARE_ONLY);
                    setIsLoading(false);
                    setCurrentState(InputFileAvatarState.ERROR);
                } else if (isBelowMinDimension || isAboveMaxDimension) {
                    onFileError?.(InputFileAvatarError.WRONG_DIMENSION);
                    setIsLoading(false);
                    setCurrentState(InputFileAvatarState.ERROR);
                } else {
                    setImagePreview(image.src);
                    setIsLoading(false);
                    setCurrentState(InputFileAvatarState.SUCCESS);
                    onFileError?.(undefined);
                    onFileSelect?.(file);
                }
            };

            image.addEventListener('load', onImageLoad);
            image.addEventListener('error', () => {
                onFileError?.(InputFileAvatarError.UNKNOWN_ERROR);
                setCurrentState(InputFileAvatarState.ERROR);
            });
            image.src = URL.createObjectURL(file);
        },
        [maxDimension, minDimension, onFileError, onFileSelect, onlySquare],
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: acceptedFileTypes,
        maxSize: maxFileSize,
        disabled: isDisabled ?? currentState === InputFileAvatarState.SELECTING,
        onDrop,
        multiple: false,
    });

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setImagePreview(null);
        setCurrentState(InputFileAvatarState.IDLE);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    const overrideCheck = isDisabled ? InputFileAvatarState.DISABLED : variant ?? currentState;
    const effectiveState = variantOverrideState[overrideCheck] ?? currentState;
    const { containerClasses, addIconClasses } = stateToClassNames[effectiveState];

    const inputAvatarClassNames = classNames(
        'group flex size-16 items-center justify-center rounded-full bg-neutral-0 hover:shadow-neutral',
        'focus:outline-none focus-visible:ring focus-visible:ring-offset',
        containerClasses,
    );

    const iconClassNames = classNames(addIconClasses);

    return (
        <InputContainer id={id} useCustomWrapper {...otherContainerProps}>
            <div {...getRootProps()} className={inputAvatarClassNames} aria-label="Select File">
                <input {...getInputProps()} id={id} type="file" aria-label="Avatar Image Select" />
                {imagePreview ? (
                    <div className="relative">
                        <Avatar src={imagePreview} size="lg" className="cursor-pointer" />
                        <button
                            onClick={handleCancel}
                            className={classNames(
                                'absolute -right-1 -top-1 cursor-pointer rounded-full bg-neutral-0 p-1 shadow-neutral',
                                'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
                            )}
                            aria-label="Cancel Selection"
                        >
                            <Icon icon={IconType.CLOSE} size="sm" />
                        </button>
                    </div>
                ) : (
                    <>
                        {!imagePreview && <Icon icon={IconType.ADD} size="lg" className={iconClassNames} />}
                        {isLoading && <Spinner size="lg" variant="neutral" />}
                    </>
                )}
            </div>
        </InputContainer>
    );
};
