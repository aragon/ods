import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';
import { useInputProps } from '../hooks';
import { InputContainer } from '../inputContainer';
import { InputFileAvatarState, type IInputFileAvatarProps } from './inputFileAvatar.api';

const stateToClassNames: Record<
    InputFileAvatarState,
    { containerClasses: string[]; addIconClasses: { base: string; hover: string } }
> = {
    [InputFileAvatarState.IDLE]: {
        containerClasses: [
            'border-[1px] border-neutral-100 hover:border-neutral-200 border-dashed cursor-pointer focus-visible:ring-primary',
        ],
        addIconClasses: { base: 'text-neutral-400', hover: 'group-hover:text-neutral-600' },
    },
    [InputFileAvatarState.SELECTING]: {
        containerClasses: ['cursor-default border-[1px] border-primary-400 focus-visible:ring-primary'],
        addIconClasses: { base: 'text-primary-400', hover: '' },
    },
    [InputFileAvatarState.WARNING]: {
        containerClasses: [
            'border-[1px] border-warning-300 hover:border-warning-400 border-dashed cursor-pointer focus-visible:ring-warning',
        ],
        addIconClasses: { base: 'text-warning-500', hover: 'group-hover:text-warning-600' },
    },
    [InputFileAvatarState.SUCCESS]: {
        containerClasses: ['border-neutral-100 border-dashed focus-visible:ring-primary'],
        addIconClasses: { base: 'text-success-500', hover: 'group-hover:text-success-600' },
    },
    [InputFileAvatarState.ERROR]: {
        containerClasses: [
            'border-[1px] border-critical-500 hover:border-critical-600 border-dashed cursor-pointer focus-visible:ring-critical',
        ],
        addIconClasses: { base: 'text-critical-500', hover: 'group-hover:text-critical-600' },
    },
    [InputFileAvatarState.DISABLED]: {
        containerClasses: ['border-[1px] border-neutral-200 cursor-not-allowed'],
        addIconClasses: { base: 'text-neutral-200', hover: '' },
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
    maxFileSize = 0,
    minDimension = 0,
    maxDimension = 0,
    onlySquare = true,
    acceptedFileTypes = ['.png', '.jpg', '.jpeg'],
    variant,
    isDisabled,
    ...otherProps
}) => {
    const [currentState, setCurrentState] = useState<InputFileAvatarState>(InputFileAvatarState.IDLE);
    const [imagePreview, setImagePreview] = useState<string>();

    const { containerProps } = useInputProps(otherProps);
    const { id, alert, ...otherContainerProps } = containerProps;

    const acceptableAvatarExtensions = (extensions: Array<`.${string}`>): Record<string, string[]> => {
        const mimeTypes: Record<string, string[]> = {};

        extensions.forEach((ext) => {
            const normalizedExt = ext.substring(1).toLowerCase();

            if (normalizedExt === 'jpg' || normalizedExt === 'jpeg') {
                mimeTypes['image/jpeg'] = [];
            } else {
                mimeTypes[`image/${normalizedExt}`] = [];
            }
        });

        return mimeTypes;
    };

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (acceptedFiles.length > 1 || rejectedFiles.length > 1) {
                onFileError?.('TOO_MANY_FILES');
                setCurrentState(InputFileAvatarState.ERROR);
                return;
            }

            if (rejectedFiles.length > 0) {
                const error = rejectedFiles[0].errors[0].code;
                onFileError?.(error);
                setCurrentState(InputFileAvatarState.ERROR);
                return;
            }

            const file = acceptedFiles[0];
            setCurrentState(InputFileAvatarState.SELECTING);
            const image = new Image();
            const onImageLoad = () => {
                const isBelowMinDimension =
                    minDimension > 0 && (image.width < minDimension || image.height < minDimension);
                const isAboveMaxDimension =
                    maxDimension > 0 && (image.width > maxDimension || image.height > maxDimension);
                if (onlySquare && image.height !== image.width) {
                    onFileError?.('ONLY_SQUARE');
                    setCurrentState(InputFileAvatarState.ERROR);
                } else if (isBelowMinDimension || isAboveMaxDimension) {
                    onFileError?.('WRONG_DIMENSION');
                    setCurrentState(InputFileAvatarState.ERROR);
                } else {
                    setImagePreview(image.src);
                    setCurrentState(InputFileAvatarState.SUCCESS);
                    onFileError?.(undefined);
                    onFileSelect?.(file);
                }
            };

            image.addEventListener('load', onImageLoad);
            image.addEventListener('error', () => {
                onFileError?.('UNKNOWN_FAIL');
                setCurrentState(InputFileAvatarState.ERROR);
            });
            image.src = URL.createObjectURL(file);
        },
        [maxDimension, minDimension, onFileError, onFileSelect, onlySquare],
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: acceptableAvatarExtensions(acceptedFileTypes),
        ...(maxFileSize > 0 && { maxSize: maxFileSize }),
        disabled: isDisabled ?? currentState === InputFileAvatarState.SELECTING,
        onDrop,
    });

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setImagePreview(undefined);
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

    const iconClassNames = classNames(addIconClasses.base, addIconClasses.hover);

    return (
        <InputContainer id={id} alert={alert} useCustomWrapper {...otherContainerProps}>
            <div {...getRootProps()} className={inputAvatarClassNames} aria-label="Select File">
                <input {...getInputProps()} id={id} type="file" aria-label="Avatar Image Select" />
                {currentState === InputFileAvatarState.SUCCESS && imagePreview ? (
                    <div className="relative">
                        <Avatar src={imagePreview} size="lg" className="cursor-pointer" data-testid="avatar" />
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
                        {currentState === InputFileAvatarState.IDLE && (
                            <Icon icon={IconType.ADD} size="lg" className={iconClassNames} />
                        )}
                        {currentState === InputFileAvatarState.SELECTING && <Spinner size="lg" variant="neutral" />}
                        {currentState === InputFileAvatarState.ERROR && (
                            <Icon icon={IconType.ADD} size="lg" className={iconClassNames} />
                        )}
                    </>
                )}
            </div>
        </InputContainer>
    );
};
