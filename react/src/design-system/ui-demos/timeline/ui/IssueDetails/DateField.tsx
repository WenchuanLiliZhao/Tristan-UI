import React from 'react';
import { TextField } from './TextField';

export const DateField: React.FC<{ label: string; value: Date }> = ({ label, value }) => (
  <TextField label={label} value={value.toLocaleDateString()} />
); 