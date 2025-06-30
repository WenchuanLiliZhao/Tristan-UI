import React from "react";
import { Tag, Icon, type TagProps } from "../../../general";
import { PropertyFieldColumn } from "../shared";

export interface TagFieldProps {
  label: string;
  name: string;
  color: string;
  icon?: string;
  /** Tag variant */
  variant?: TagProps['variant']
}

export const TagField: React.FC<TagFieldProps> = ({
  label,
  name,
  color,
  icon,
  variant = "contained",
}) => (
  <PropertyFieldColumn
    label={label}
    content={
      <Tag color={color} variant={variant}>
        {icon && <Icon name={icon} />} {name}
      </Tag>
    }
  />
);
