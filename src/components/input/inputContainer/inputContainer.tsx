import classNames from 'classnames';
import type { ReactNode } from 'react';
import { AlertInline } from '../../alerts';

export interface IInputContainerProps {
    /**
     * Label of the input.
     */
    label?: string;
    /**
     * Help text displayed above the input.
     */
    helpText?: string;
    /**
     * Displays the optional tag when set to true.
     */
    isOptional?: boolean;
    /**
     * Additional information displayed below the input.
     */
    infoText?: string;
    /**
     * Alert message displayed below the input.
     */
    alertMessage?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Classes for the component.
     */
    className?: string;
}

export const InputContainer: React.FC<IInputContainerProps> = (props) => {
    const { label, helpText, isOptional, infoText, alertMessage, children, className } = props;

    return (
        <div className={classNames('flex flex-col gap-2', className)}>
            {(label != null || helpText != null) && (
                <div className="flex flex-col gap-0.5">
                    {label && (
                        <div className="flex flex-row items-center gap-3">
                            <p className="text-base font-semibold leading-normal text-neutral-600">{label}</p>
                            {isOptional && <p>TODO tag</p>}
                        </div>
                    )}
                    {helpText && <p className="text-sm font-normal leading-normal text-neutral-800">{helpText}</p>}
                </div>
            )}
            <div className="h-12 w-80 rounded-xl border border-neutral-100 bg-neutral-0">{children}</div>
            {infoText && <p className="text-sm font-normal leading-tight text-neutral-600">{infoText}</p>}
            {alertMessage && <AlertInline variant="critical" message={alertMessage} />}
        </div>
    );
};
