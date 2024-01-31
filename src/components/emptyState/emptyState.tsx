import classNames from 'classnames';
import type { IEmptyStateProps } from '.';
import { Button } from '../button';
import {
    IllustrationHuman,
    IllustrationObject,
    type IIllustrationHumanProps,
    type IllustrationObjectType,
} from '../illustrations';

export const EmptyState: React.FC<IEmptyStateProps> = ({
    illustration,
    illustrationType = 'object',
    title,
    description,
    primaryButton,
    secondaryButton,
    className,
    isStacked = true,
}) => {
    const containerClassNames = classNames(
        'grid w-[320px] md:w-[640px]',
        { 'grid-cols-1 justify-items-center p-6 md:p-12': isStacked },
        {
            'grid-cols-[max-content_auto] md:gap-max p-4 md:p-5': !isStacked,
        },
        className,
    );

    const renderIllustration = () => {
        if (illustrationType === 'human' && isStacked) {
            return (
                <IllustrationHuman
                    className={classNames({
                        'h-auto !w-[295px] md:!w-[400px]': isStacked,
                        'order-last h-auto w-[80px] justify-self-end rounded-full bg-neutral-50 md:w-[96px]':
                            !isStacked,
                    })}
                    {...(illustration as IIllustrationHumanProps)}
                />
            );
        } else {
            return (
                <IllustrationObject
                    className={classNames({
                        'h-auto w-[160px]': isStacked,
                        'order-last h-auto w-[80px] justify-self-end rounded-full bg-neutral-50 md:w-[96px]':
                            !isStacked,
                    })}
                    object={illustration as IllustrationObjectType}
                />
            );
        }
    };

    return (
        <div className={containerClassNames}>
            {renderIllustration()}

            <div
                className={classNames({
                    'flex w-full flex-col items-center space-y-6': isStacked,
                    'space-y-4 md:items-start': !isStacked,
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
                        {title}
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
                        'flex w-full flex-col items-stretch space-x-0 space-y-3 md:w-max md:flex-row md:items-center md:space-x-4 md:space-y-0':
                            isStacked,
                        'flex flex-col space-x-0 space-y-1 md:flex-row md:space-x-1 md:space-y-0': !isStacked,
                    })}
                >
                    {primaryButton && (
                        <Button
                            size={isStacked ? 'lg' : 'sm'}
                            responsiveSize={isStacked ? { md: 'lg' } : { md: 'md' }}
                            variant="primary"
                            iconLeft={primaryButton.iconLeft}
                            iconRight={primaryButton.iconRight}
                        >
                            {primaryButton.children}
                        </Button>
                    )}
                    {secondaryButton && (
                        <Button
                            size={isStacked ? 'lg' : 'sm'}
                            responsiveSize={isStacked ? { md: 'lg' } : { md: 'md' }}
                            variant="secondary"
                            iconLeft={secondaryButton.iconLeft}
                            iconRight={secondaryButton.iconRight}
                        >
                            {secondaryButton.children}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
