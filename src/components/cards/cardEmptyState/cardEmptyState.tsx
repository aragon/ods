import classNames from 'classnames';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { IllustrationObject } from '../../illustrations';
import { Card } from '../card';
import type { ICardEmptyStateProps } from './cardEmptyState.api';

export const CardEmptyState: React.FC<ICardEmptyStateProps> = (props) => {
    const {
        illustration = 'LIGHTBULB',
        title = 'Title',
        description = 'Description',
        primaryButton = {
            children: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            variant: 'primary',
        },
        secondaryButton = {
            children: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            variant: 'secondary',
        },
        className,
        ...otherProps
    } = props;

    const containerClassNames = classNames('flex flex-col items-center justify-between p-6');

    return (
        <Card className={classNames('w-[320px]')} {...otherProps}>
            <div className={containerClassNames}>
                <IllustrationObject object={illustration} width={160} height={160} />
                <div className="flex w-full flex-col items-center space-y-6">
                    <div className="flex flex-col items-center space-y-1">
                        <p className="text-xl font-normal leading-tight">{title}</p>
                        <p className="text-base font-normal leading-tight text-neutral-500">{description}</p>
                    </div>
                    <div className="flex w-full flex-col space-y-3">
                        {primaryButton && (
                            <Button
                                size="lg"
                                className="!w-full"
                                variant="primary"
                                iconLeft={primaryButton.iconLeft}
                                iconRight={primaryButton.iconRight}
                            >
                                {primaryButton.children}
                            </Button>
                        )}
                        {secondaryButton && (
                            <Button
                                size="lg"
                                className="!w-full"
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
        </Card>
    );
};
