import React from "react";
import classNames from "classnames";
import { TagColorScheme, TagProps } from "./tag.api";

const colorSchemeClass: Record<TagColorScheme, string> = {
  neutral: "bg-ui-100 text-ui-600",
  info: "bg-info-200 text-info-800",
  warning: "bg-warning-200 text-warning-800",
  critical: "bg-critical-200 text-critical-800",
  success: "bg-success-200 text-success-800",
  primary: "bg-primary-100 text-primary-800",
};

export const Tag: React.FC<TagProps> = (props) => {
  const { children, colorScheme = "neutral", className } = props;

  return (
    <div
      style={{ paddingTop: 2, paddingBottom: 2 }}
      className={classNames(
        "ft-text-sm text-center px-0.5 font-bold rounded items-center",
        colorSchemeClass[colorScheme],
        className
      )}
    >
      {children}
    </div>
  );
};
