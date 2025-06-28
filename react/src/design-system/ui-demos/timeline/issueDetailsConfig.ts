import type React from 'react';

export interface ValueMappingEntry {
  name: string;
  color: string;
  icon?: string;
  description?: string;
}

export interface PropertyMappingConfig {
  /** Custom label in the UI (optional) */
  label?: string;
  /** Custom renderer for the value */
  formatter?: (value: unknown) => React.ReactNode;
  /** Mapping from raw field value to display metadata */
  valueMapping?: Record<string, ValueMappingEntry>;
}

/**
 * Configuration object for IssueDetails component.
 * All properties are optional so that users can override only what they need.
 */
export interface IssueDetailsConfig<T = Record<string, unknown>> {
  /** Mapping configuration for each field */
  propertyMappings?: Record<keyof T | string, PropertyMappingConfig>;
  /** Order of properties shown in the UI */
  propertyOrder?: (keyof T | string)[];
  /** Optional sections to group properties visually */
  sections?: Array<{
    title: string;
    properties: (keyof T | string)[];
    collapsible?: boolean;
  }>;
}

/**
 * Builder class that provides a fluent API for constructing IssueDetailsConfig objects.
 */
export class IssueDetailsConfigBuilder<T = Record<string, unknown>> {
  private readonly config: IssueDetailsConfig<T> = {};

  static create<T = Record<string, unknown>>(): IssueDetailsConfigBuilder<T> {
    return new IssueDetailsConfigBuilder<T>();
  }

  /** Add or update mapping configuration for a specific field */
  addPropertyMapping(field: keyof T | string, mapping: PropertyMappingConfig): this {
    if (!this.config.propertyMappings) {
      this.config.propertyMappings = {} as Record<keyof T | string, PropertyMappingConfig>;
    }
    (this.config.propertyMappings as Record<keyof T | string, PropertyMappingConfig>)[field] = mapping;
    return this;
  }

  /** Define the overall display order of properties */
  setPropertyOrder(order: (keyof T | string)[]): this {
    this.config.propertyOrder = order;
    return this;
  }

  /** Add a logical section grouping */
  addSection(title: string, properties: (keyof T | string)[], collapsible = false): this {
    if (!this.config.sections) this.config.sections = [];
    this.config.sections.push({ title, properties, collapsible });
    return this;
  }

  /** Finalise and obtain the configuration object */
  build(): IssueDetailsConfig<T> {
    return { ...this.config };
  }
} 