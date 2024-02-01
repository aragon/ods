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
    illustrationType,
    title,
    description,
    primaryButton,
    secondaryButton,
    className,
    isStacked,
}) => {
    const containerClassNames = classNames(
        'grid w-[320px] md:w-[640px]',
        { 'grid-cols-1 justify-items-center p-6 md:p-12 gap-4 md:gap-6': isStacked },
        {
            'grid-cols-[max-content_auto] p-4 md:p-5': !isStacked,
        },
        className,
    );

    const illustrationHumanClassNames = classNames({
        'h-auto !w-[295px] md:!w-[400px] mb-4 md:mb-6': isStacked,
        'order-last h-auto w-[80px] justify-self-end rounded-full bg-neutral-50 md:w-[96px]': !isStacked,
    });

    const illustrationObjectClassNames = classNames({
        'h-auto w-[160px]': isStacked,
        'order-last h-auto w-[80px] justify-self-end rounded-full bg-neutral-50 md:w-[96px]': !isStacked,
    });

    const detailsAndButtonsClassNames = classNames('h-full', {
        'flex flex-col w-full items-center': isStacked,
        'space-y-6': (isStacked && !!primaryButton) || !!secondaryButton,
        'space-y-4': (!isStacked && !!primaryButton) || !!secondaryButton,
    });

    const buttonContainerClassNames = classNames({
        'flex border-w-full flex-col items-stretch space-x-0 space-y-3 md:flex-row md:justify-center md:space-x-4 md:space-y-0':
            isStacked,
        'flex flex-col space-x-0 space-y-1 md:flex-row md:space-x-1 md:space-y-0': !isStacked,
    });

    const detailsClassNames = classNames({
        'flex flex-col items-center space-y-1 md:space-y-2': isStacked,
        'items-start space-y-0.5 md:space-y-1': !isStacked,
    });

    const titleClassNames = classNames('font-normal leading-tight text-neutral-800', {
        'text-xl md:text-2xl': isStacked,
        'text-base md:text-lg': !isStacked,
    });

    const descriptionClassNames = classNames('font-normal leading-tight text-neutral-500', {
        'text-sm md:text-base': isStacked,
        'text-xs md:text-sm': !isStacked,
    });

    const renderIllustration = () => {
        if (illustrationType === 'human') {
            return (
                <IllustrationHuman
                    className={illustrationHumanClassNames}
                    {...(illustration as IIllustrationHumanProps)}
                />
            );
        } else {
            return (
                <IllustrationObject
                    className={illustrationObjectClassNames}
                    object={illustration as IllustrationObjectType}
                />
            );
        }
    };

    return (
        <div className={containerClassNames}>
            {renderIllustration()}

            <div className={detailsAndButtonsClassNames}>
                <div className={detailsClassNames}>
                    <p className={titleClassNames}>{title}</p>
                    <p className={descriptionClassNames}>{description}</p>
                </div>
                <div className={buttonContainerClassNames}>
                    {primaryButton && (
                        <Button
                            size={isStacked ? 'lg' : 'sm'}
                            responsiveSize={isStacked ? { md: 'lg' } : { md: 'md' }}
                            variant="primary"
                            iconLeft={primaryButton.iconLeft}
                            iconRight={primaryButton.iconRight}
                        >
                            {primaryButton.label}
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
                            {secondaryButton.label}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
