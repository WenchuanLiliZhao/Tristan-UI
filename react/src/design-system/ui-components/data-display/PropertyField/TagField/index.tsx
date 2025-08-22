import React from "react";
import { Tag, type TagProps } from "../../../general";
import { PropertyFieldColumn } from "../shared";

export interface TagFieldProps {
  label: string;
  name: string;
  color: string;
  icon?: string;
  /** Tag variant */
  size?: TagProps['size']
  variant?: TagProps['variant']
  wrap?: TagProps['wrap']
}

export const TagField: React.FC<TagFieldProps> = ({
  label,
  name,
  color,
  size = "small",
  variant = "contained",
  wrap = false,
}) => (
  <PropertyFieldColumn
    {...{ label }}
    content={
      <Tag color={color} variant={variant} size={size} wrap={wrap}>
        {name}
      </Tag>
    }
  />
);
