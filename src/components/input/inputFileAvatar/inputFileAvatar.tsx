import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import { SelectState, type IInputFileAvatarProps } from '.';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';
import { useInputProps } from '../hooks';
import { InputContainer } from '../inputContainer';
import { type IInputContainerAlert } from '../inputContainer/inputContainer.api';

export const InputFileAvatar: React.FC<IInputFileAvatarProps> = ({ onFileSelect, ...otherProps }) => {
    const [selectState, setSelectState] = useState<SelectState>(SelectState.IDLE);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectError, setSelectError] = useState<IInputContainerAlert | undefined>(undefined);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { containerProps } = useInputProps(otherProps);
    const { id, alert, isDisabled, ...otherContainerProps } = containerProps;

    /**
     * adjust the first nubmer to change the max file size by megabyte
     */
    const MAX_FILE_SIZE = 2 * 1024 ** 2;
    const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif'];
    const ERROR_MESSAGES = {
        TOO_LARGE: 'File is too large. Max size is 2 MiB.',
        FILE_TYPE: 'Invalid file type. Only JPEG and PNG are allowed.',
        FAILED: 'Selection failed. Please try again.',
    };
    const setCriticalSelectError = (message: string) => {
        setSelectError({ message, variant: 'critical' });
    };

    const handleAvatarClick = useCallback(() => {
        /** remove success state to route user to cancel button
         * as only means to reselect after success
         * see below regarding event propogation
         */
        if (
            selectState === SelectState.IDLE ||
            selectState === SelectState.ERROR ||
            selectState === SelectState.SUCCESS
        ) {
            fileInputRef.current?.click();
        }
    }, [selectState]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            if (event.target) {
                event.target.value = '';
            }
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setCriticalSelectError(ERROR_MESSAGES.TOO_LARGE);
            setSelectState(SelectState.ERROR);
            return;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setCriticalSelectError(ERROR_MESSAGES.FILE_TYPE);
            setSelectState(SelectState.ERROR);
            return;
        }

        onFileSelect?.(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        setSelectState(SelectState.SELECTING);
        setSelectError(undefined);
        // TODO: Implement the file select logic
        // Simulate select process

        setSelectState(SelectState.SUCCESS);
        setSelectError(undefined);

        event.target.value = '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        /** Prevent the file input from opening on cancel after success,
         * we can adjust for UX, but avatar is optional currently,
         * see above regarding success state for direct retry  */
        event.stopPropagation();

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
                <button className={selecterVariantStateClasses} onClick={handleAvatarClick} aria-label="Select File">
                    {selectState === SelectState.SUCCESS && imagePreview ? (
                        <div className="relative">
                            <Avatar src={imagePreview} size="lg" />
                            <button
                                onClick={handleCancel}
                                className="absolute -right-1 -top-1 cursor-pointer rounded-full bg-neutral-0 p-1 shadow-neutral focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset"
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
                </button>
                <input
                    id={id}
                    type="file"
                    aria-label="Avatar Image Select"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    disabled={selectState === 'selecting' || isDisabled}
                />
            </InputContainer>
        </>
    );
};
