import type { ButtonHTMLAttributes } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<IButtonProps> = (props) => {
    return <button {...props} />;
};
