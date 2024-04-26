import classNames from 'classnames';
import { useState } from 'react';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { type ICardProps } from '../card';

interface ICollapsibleCardProps extends ICardProps {
    isOpen: boolean;
    initialHeight: string;
}

export const CollapsibleCard: React.FC<ICollapsibleCardProps> = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const wrapperClassNames = classNames(
        'overflow-hidden rounded-lg border border-neutral-200 p-6 transition-all duration-1000 ease-in-out',
        isOpen ? 'bg-neutral-0' : 'bg-gradient-to-t from-neutral-100 to-neutral-0',
    );

    const contentClassNames = classNames(
        'gap-y-6 flex flex-col',
        isOpen ? 'h-full transition-all duration-500' : 'h-48',
    );

    const buttonClassNames = classNames('fixed bottom-5 right-5 opacity-50 hover:opacity-100');

    return (
        <div className={wrapperClassNames}>
            <div className={contentClassNames}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed acet, consectetur adipiscing elit. Sed
                    ace elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia enim vero, blanditiis
                    sequi, voluptates minima autem odit cupiditate deserunt distinctio, recusandae accusantium nisi
                    facere? Quibusdam cum eaque corrupti enim saepe? Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Sed acet, consectetur adipiscing elit. Sed ace elit. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit.
                </p>
                <p>
                    Quia enim vero, blanditiis sequi, voluptates minima autem odit cupiditate deserunt distinctio,
                    recusandae accusantium nisi facere? Quibusdam cum eaque corrupti enim saepe? Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Sed acet, consectetur adipiscing elit. Sed ace elit. Lorem ipsum
                    dolor, sit amet consectetur adipisicing elit. Quia enim vero, blanditiis sequi, voluptates minima
                    autem odit cupiditate deserunt distinctio, recusandae accusantium nisi facere? Quibusdam cum eaque
                    corrupti enim saepe? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed acet, consectetur
                    adipiscing elit. Sed ace elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit
                </p>
                <p>
                    Quia enim vero, blanditiis sequi, voluptates minima autem odit cupiditate deserunt distinctio,
                    recusandae accusantium nisi facere? Quibusdam cum eaque corrupti enim saepe? Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Sed acet, consectetur adipiscing elit. Sed ace elit. Lorem ipsum
                    dolor, sit amet consectetur adipisicing elit. Quia enim vero, blanditiis sequi, voluptates minima
                    autem odit cupiditate deserunt distinctio, recusandae accusantium nisi facere? Quibusdam cum eaque
                    corrupti enim saepe? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed acet, consectetur
                    adipiscing elit. Sed ace elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia enim
                    vero, blanditiis sequi, voluptates minima autem odit cupiditate deserunt distinctio, recusandae
                    accusantium nisi facere? Quibusdam cum eaque corrupti enim saepe? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed acet, consectetur adipiscing elit. Sed ace elit. Lorem ipsum dolor,
                    sit amet consectetur adipisicing elit. Quia enim vero, blanditiis sequi, voluptates minima autem
                    odit cupiditate deserunt distinctio, recusandae accusantium nisi facere? Quibusdam cum eaque
                    corrupti enim saepe? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed acet, consectetur
                    adipiscing elit. Sed ace elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia enim
                    vero, blanditiis sequi, voluptates minima autem odit cupiditate deserunt distinctio
                </p>
            </div>
            <Button
                variant="secondary"
                onClick={toggle}
                iconLeft={isOpen ? IconType.MINUS : IconType.PLUS}
                className={buttonClassNames}
            />
        </div>
    );
};
