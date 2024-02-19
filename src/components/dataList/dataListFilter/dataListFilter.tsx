import classNames from 'classnames';
import { AvatarIcon } from '../../avatars';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { InputContainer } from '../../input';
import { useInputProps } from '../../input/hooks';

export interface IDataListFilterProps {
    /**
     * Callback called on filter button click. The filter button is not displayed when the callback is not defined.
     */
    onFilterClick?: () => void;
}

export const DataListFilter: React.FC<IDataListFilterProps> = (props) => {
    const { onFilterClick } = props;

    const { containerProps, inputProps } = useInputProps({});

    const { className: inputClassName, ...otherInputProps } = inputProps;

    return (
        <InputContainer {...containerProps} wrapperClassName="!rounded-3xl">
            <AvatarIcon icon={IconType.SEARCH} size="md" className="ml-4 shrink-0" />
            <input
                type="search"
                className={classNames('search-cancel:appearance-none', inputClassName)}
                {...otherInputProps}
            />
            <div className="m-3 flex flex-row gap-3">
                {onFilterClick && (
                    <Button iconLeft={IconType.FILTER} variant="tertiary" size="md" onClick={onFilterClick}>
                        Filter
                    </Button>
                )}
                <Button iconLeft={IconType.SORT} variant="tertiary" size="md">
                    Sort
                </Button>
            </div>
        </InputContainer>
    );
};
