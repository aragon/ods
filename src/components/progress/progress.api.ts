import { type HTMLAttributes } from "react";

export interface IProgressProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant.
   * @default default
   */
  variant?: 'default' | 'thick' | 'thin';
  /**
   * Current progress to be rendered.
   */
  value: number;
}
