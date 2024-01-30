import classNames from 'classnames';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { IllustrationObject } from '../../illustrations';
import { Card } from '../card';
import type { ICardSummaryProps } from './cardEmptyState.api';

export const CardEmptyState: React.FC<ICardSummaryProps> = (props) => {
    const { icon, value, description, action, isStacked = true, className, ...otherProps } = props;

    const containerClassNames = classNames('flex flex-col items-center justify-between p-6');

    return (
        <Card className={classNames('w-[320px]')} {...otherProps}>
            <div className={containerClassNames}>
                <IllustrationObject object="LIGHTBULB" width={160} height={160} />
                <div className="flex w-full flex-col items-center space-y-6">
                    <div className="flex flex-col items-center space-y-1">
                        <p className="text-xl font-normal leading-tight">Title</p>
                        <p className="text-base font-normal leading-tight text-neutral-500">Description</p>
                    </div>
                    <div className="flex w-full flex-col space-y-3">
                        <Button
                            size="lg"
                            className="!w-full"
                            variant="primary"
                            iconLeft={IconType.ADD}
                            iconRight={IconType.CHEVRON_RIGHT}
                        >
                            Label
                        </Button>
                        <Button
                            size="lg"
                            className="!w-full"
                            variant="secondary"
                            iconLeft={IconType.ADD}
                            iconRight={IconType.CHEVRON_RIGHT}
                        >
                            Label
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};
