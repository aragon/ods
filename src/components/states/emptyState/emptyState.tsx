import classNames from 'classnames';
import type { IEmptyStateProps } from '.';
import { Button, type IButtonProps } from '../../button';
import {
    IllustrationHuman,
    IllustrationObject,
    type IIllustrationHumanProps,
    type IIllustrationObjectProps,
} from '../../illustrations';
import type { IEmptyStateButton } from './emptyState.api';

export const EmptyState: React.FC<IEmptyStateProps> = ({
    heading,
    description,
    primaryButton,
    secondaryButton,
    className,
    isStacked = true,
    illustrationProps,
}) => {
    const containerClassNames = classNames(
        'grid w-[320px] md:w-[640px]',
        { 'grid-cols-1 justify-items-center p-6 md:p-12 gap-4 md:gap-6': isStacked },
        {
            'grid-cols-[192px_max-content] md:grid-cols-[480px_max-content] gap-4 p-4 md:px-6 md:py-5': !isStacked,
        },
        className,
    );

    const isHumanIllustration = () => {
        if ('expression' in illustrationProps) {
            return true;
        }
        return false;
    };

    return (
        <div className={containerClassNames}>
            {isHumanIllustration() && isStacked && (
                <IllustrationHuman
                    className={classNames({
                        'mb-4 h-auto !w-[295px] md:mb-6 md:!w-[400px]': isStacked,
                    })}
                    {...(illustrationProps as IIllustrationHumanProps)}
                    role="img"
                    aria-label="Human Illustration"
                />
            )}
            {!isHumanIllustration() && (
                <IllustrationObject
                    {...(illustrationProps as IIllustrationObjectProps)}
                    className={classNames({
                        'h-auto w-[160px]': isStacked,
                        'order-last h-auto w-[80px] justify-self-end rounded-full bg-neutral-50 md:w-[96px]':
                            !isStacked,
                    })}
                    role="img"
                    aria-label="Object Illustration"
                />
            )}

            <div
                className={classNames('h-full', {
                    'flex w-full flex-col items-center': isStacked,
                    'space-y-6': (isStacked && !!primaryButton) || !!secondaryButton,
                    'space-y-4': (!isStacked && !!primaryButton) || !!secondaryButton,
                })}
            >
                <div
                    className={classNames({
                        'flex flex-col items-center space-y-1 md:space-y-2': isStacked,
                        'items-start space-y-0.5 md:space-y-1': !isStacked,
                    })}
                >
                    <p
                        className={classNames('font-normal leading-tight text-neutral-800', {
                            'text-xl md:text-2xl': isStacked,
                            'text-base md:text-lg': !isStacked,
                        })}
                    >
                        {heading}
                    </p>
                    <p
                        className={classNames('font-normal leading-tight text-neutral-500', {
                            'text-sm md:text-base': isStacked,
                            'text-xs md:text-sm': !isStacked,
                        })}
                    >
                        {description}
                    </p>
                </div>
                <div
                    className={classNames({
                        'border-w-full flex flex-col items-stretch space-x-0 space-y-3 md:flex-row md:justify-center md:space-x-4 md:space-y-0':
                            isStacked,
                        'flex flex-row flex-wrap gap-3': !isStacked,
                    })}
                >
                    {primaryButton && (
                        <Button
                            {...(primaryButton as IEmptyStateButton & IButtonProps)}
                            size={isStacked ? 'lg' : 'sm'}
                            responsiveSize={isStacked ? { md: 'lg' } : { md: 'md' }}
                            variant="primary"
                        >
                            {primaryButton.label}
                        </Button>
                    )}
                    {secondaryButton && (
                        <Button
                            {...(secondaryButton as IEmptyStateButton & IButtonProps)}
                            size={isStacked ? 'lg' : 'sm'}
                            responsiveSize={isStacked ? { md: 'lg' } : { md: 'md' }}
                            variant="secondary"
                        >
                            {secondaryButton.label}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
