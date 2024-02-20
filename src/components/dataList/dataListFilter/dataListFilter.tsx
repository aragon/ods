import classNames from 'classnames';
import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';
import { AvatarIcon } from '../../avatars';
import { Button } from '../../button';
import { Dropdown } from '../../dropdown';
import { Icon, IconType } from '../../icon';
import { InputContainer } from '../../input';
import { useInputProps } from '../../input/hooks';
import { Spinner } from '../../spinner';

export interface IDataListFilterProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
    /**
     * Current value of the search bar.
     */
    searchValue?: string;
    /**
     * Callback called on search value change.
     */
    onSearchValueChange: (value?: string) => void;
    /**
     * Displays a loading indicator when set to true.
     */
    isLoading?: boolean;
    /**
     * Callback called on filter button click. The filter button is not displayed when the callback is not defined.
     */
    onFilterClick?: () => void;
}

export const DataListFilter: React.FC<IDataListFilterProps> = (props) => {
    const { onFilterClick, isLoading, searchValue = '', onSearchValueChange, ...otherProps } = props;

    const [isFocused, setIsFocused] = useState(false);

    const { containerProps, inputProps } = useInputProps({ value: searchValue });
    const { className: inputClassName, onChange, ...otherInputProps } = inputProps;
    const { wrapperClassName: containerWrapperClassName, inputLength = 0, ...otherContainerProps } = containerProps;

    const handleInputFocus = () => setIsFocused(true);

    const handleInputBlur = () => setIsFocused(false);

    const handleClear = () => onSearchValueChange(undefined);

    const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => onSearchValueChange(event.target.value);

    const displayClearIcon = inputLength > 0;

    return (
        <InputContainer
            wrapperClassName={classNames(containerWrapperClassName, '!ring-0')}
            {...otherContainerProps}
            {...otherProps}
        >
            {!isLoading && (
                <AvatarIcon
                    icon={IconType.SEARCH}
                    size="md"
                    className="ml-4 shrink-0"
                    variant={isFocused ? 'primary' : 'neutral'}
                />
            )}
            {isLoading && (
                <div className="m-1">
                    <Spinner size="lg" variant="primary" className="ml-4 shrink-0" />
                </div>
            )}
            <input
                type="search"
                className={classNames('search-cancel:appearance-none', inputClassName)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleSearchValueChange}
                {...otherInputProps}
            />
            {displayClearIcon && (
                <button className="mr-4" onClick={handleClear}>
                    <Icon icon={IconType.CLOSE} className="text-neutral-600" />
                </button>
            )}
            <div className="m-3 flex flex-row gap-3">
                {onFilterClick && (
                    <Button iconLeft={IconType.FILTER} variant="tertiary" size="md" onClick={onFilterClick}>
                        Filter
                    </Button>
                )}
                <Dropdown.Container
                    customTrigger={
                        <Button iconLeft={IconType.SORT} variant="tertiary" size="md">
                            Sort
                        </Button>
                    }
                >
                    <Dropdown.Item>Test</Dropdown.Item>
                </Dropdown.Container>
            </div>
        </InputContainer>
    );
};
