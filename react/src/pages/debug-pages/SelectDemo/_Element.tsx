import React, { useState } from 'react';
import { Select, type SelectOption } from '../../../design-system/ui-components/data-entry';
import { Dropdown, Button, Icon, type CascaderGroupProps } from '../../../design-system/ui-components';
import styles from './SelectStyleDemo.module.scss';

export const Element: React.FC = () => {
  const [basicValue, setBasicValue] = useState<string>();
  const [searchableValue, setSearchableValue] = useState<string>();
  const [controlledValue, setControlledValue] = useState<string>();
  const [sizeValue, setSizeValue] = useState<string>();
  
  // Style demo states
  const [categoryValue, setCategoryValue] = useState<string>();
  
  // GroupBySelector-style states
  const [groupByValue, setGroupByValue] = useState<string>('Category');
  const [teamValue, setTeamValue] = useState<string>('Frontend Team');

  // Sample data
  const fruitOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'raspberry', label: 'Raspberry' },
    { value: 'blackberry', label: 'Blackberry' },
  ];

  const frameworkOptions: SelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid.js' },
    { value: 'preact', label: 'Preact' },
    { value: 'ember', label: 'Ember.js' },
    { value: 'backbone', label: 'Backbone.js' },
  ];

  const countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
    { value: 'au', label: 'Australia' },
  ];

  // Style demo options
  const categoryOptions: SelectOption[] = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'testing', label: 'Testing' },
    { value: 'deployment', label: 'Deployment' },
  ];



  // GroupBySelector-style options (for Dropdown + Button implementation)
  const groupBySelectorOptions = [
    { key: 'category', label: 'Category', value: 'category' },
    { key: 'priority', label: 'Priority', value: 'priority' },
    { key: 'status', label: 'Status', value: 'status' },
    { key: 'team', label: 'Team', value: 'team' },
  ];

  const teamOptions = [
    { key: 'frontend', label: 'Frontend Team', value: 'frontend' },
    { key: 'backend', label: 'Backend Team', value: 'backend' },
    { key: 'design', label: 'Design Team', value: 'design' },
    { key: 'qa', label: 'QA Team', value: 'qa' },
  ];

  const handleBasicSelect = (value: string | number, option: SelectOption) => {
    console.log('Basic select:', value, option);
    setBasicValue(value as string);
  };

  const handleSearchableSelect = (value: string | number, option: SelectOption) => {
    console.log('Searchable select:', value, option);
    setSearchableValue(value as string);
  };

  const handleControlledSelect = (value: string | number, option: SelectOption) => {
    console.log('Controlled select:', value, option);
    setControlledValue(value as string);
  };

  const handleSizeSelect = (value: string | number, option: SelectOption) => {
    console.log('Size select:', value, option);
    setSizeValue(value as string);
  };

  const handleClear = (setter: React.Dispatch<React.SetStateAction<string | undefined>>) => {
    return () => {
      setter(undefined);
    };
  };

  // GroupBySelector-style handlers
  const createGroupByOptions = (): CascaderGroupProps[] => {
    return [
      {
        items: groupBySelectorOptions.map((option) => ({
          key: option.key,
          content: (
            <Button
              size="medium"
              widthMode="full width"
              decoIcon={option.label === groupByValue ? "check" : undefined}
              variant={option.label === groupByValue ? "filled" : "ghost"}
              semantic={option.label === groupByValue ? "active" : "default"}
            >
              {option.label}
            </Button>
          ),
          value: option.value,
          interactive: true, // Use optimized interactive mode
        })),
      },
    ];
  };

  const createTeamOptions = (): CascaderGroupProps[] => {
    return [
      {
        items: teamOptions.map((option) => ({
          key: option.key,
          content: (
            <Button
              size="medium"
              widthMode="full width"
              decoIcon={option.label === teamValue ? "check" : undefined}
              variant={option.label === teamValue ? "filled" : "ghost"}
              semantic={option.label === teamValue ? "active" : "default"}
            >
              {option.label}
            </Button>
          ),
          value: option.value,
          interactive: true, // Use optimized interactive mode
        })),
      },
    ];
  };

  const handleGroupByChange = (value: string | number | object | undefined) => {
    if (typeof value === "string") {
      const option = groupBySelectorOptions.find(opt => opt.value === value);
      if (option) {
        setGroupByValue(option.label);
      }
    }
  };

  const handleTeamChange = (value: string | number | object | undefined) => {
    if (typeof value === "string") {
      const option = teamOptions.find(opt => opt.value === value);
      if (option) {
        setTeamValue(option.label);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>Select Component Demo</h1>
      
      {/* Style Demo Section - Inspired by GroupBySelector */}
      <section className={styles['select-style-demo']}>
        <h2 className={styles['demo-title']}>GroupBySelector-Inspired Select Styles</h2>
        <p className={styles['demo-description']}>
          Select components styled similar to the GroupBySelector component, featuring compact layouts, 
          labeled containers, and visual feedback for selected values.
        </p>
        
        <div className={styles['demo-grid']}>
          {/* Original Select components for comparison */}
          <div className={styles['select-container']}>
            <div className={styles['select-label']}>Category (Select)</div>
            <div className={styles['select-wrapper']}>
              <Select
                className={styles['select-custom']}
                options={categoryOptions}
                value={categoryValue}
                placeholder="Select category..."
                onSelect={(value) => setCategoryValue(value as string)}
                onClear={() => setCategoryValue(undefined)}
                size="small"
              />
            </div>
            <div className={styles['select-value-info']}>
              {categoryValue ? `Selected: ${categoryOptions.find(opt => opt.value === categoryValue)?.label}` : 'No selection'}
            </div>
          </div>

          {/* GroupBySelector-style Dropdown + Button */}
          <div className={styles['select-container']}>
            <div className={styles['select-label']}>Group By (Dropdown)</div>
            <div className={styles['select-wrapper']}>
              <Dropdown
                className={styles['group-by-dropdown']}
                trigger={
                  <div className={styles['group-by-value-container']}>
                    <div className={styles['group-by-value']}>{groupByValue}</div>
                    <Icon
                      className={styles['group-by-value-icon']}
                      name="chevron_right"
                    />
                  </div>
                }
                groups={createGroupByOptions()}
                position="right-start"
                onItemClick={handleGroupByChange}
                width={160}
              />
            </div>
            <div className={styles['select-value-info']}>
              Using Dropdown + Button (like GroupBySelector)
            </div>
          </div>

          {/* Another GroupBySelector-style example */}
          <div className={styles['select-container']}>
            <div className={styles['select-label']}>Team (Dropdown)</div>
            <div className={styles['select-wrapper']}>
              <Dropdown
                className={styles['group-by-dropdown']}
                trigger={
                  <div className={styles['group-by-value-container']}>
                    <div className={styles['group-by-value']}>{teamValue}</div>
                    <Icon
                      className={styles['group-by-value-icon']}
                      name="chevron_right"
                    />
                  </div>
                }
                groups={createTeamOptions()}
                position="right-start"
                onItemClick={handleTeamChange}
                width={180}
              />
            </div>
            <div className={styles['select-value-info']}>
              Dropdown with Button content
            </div>
          </div>
        </div>

        {/* Exact GroupBySelector layout replica */}
        <div className={styles['inline-demo']}>
          <div className={styles['inline-label']}>Exact GroupBySelector Style:</div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2px',
            padding: '8px',
            backgroundColor: 'var(--color--bg-secondary)',
            borderRadius: '4px',
            border: '1px solid var(--color--border-prime)',
            minWidth: '200px'
          }}>
            <div style={{
              fontSize: '10px',
              color: 'var(--color--text-negative)',
              lineHeight: '12px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              padding: '0 8px'
            }}>Group By</div>
            <Dropdown
              trigger={
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '2px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--color--text-secondary)',
                    lineHeight: '20px'
                  }}>{groupByValue}</div>
                  <Icon style={{
                    fontSize: '18px',
                    color: 'var(--color--text-secondary)',
                    lineHeight: '20px'
                  }} name="chevron_right" />
                </div>
              }
              groups={createGroupByOptions()}
              position="right-start"
              onItemClick={handleGroupByChange}
              width={160}
            />
          </div>
        </div>
      </section>
      
      {/* Basic Usage */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Basic Usage</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Simple select dropdown with predefined options
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Basic Select</h4>
            <Select
              options={fruitOptions}
              value={basicValue}
              placeholder="Choose a fruit..."
              onSelect={handleBasicSelect}
              onClear={handleClear(setBasicValue)}
            />
            {basicValue && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color--text-tertiary)' }}>
                Selected: {fruitOptions.find(opt => opt.value === basicValue)?.label}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Searchable Select */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Searchable Select</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Select with search functionality to filter options
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Searchable Framework Select</h4>
            <Select
              options={frameworkOptions}
              value={searchableValue}
              searchable={true}
              placeholder="Search frameworks..."
              onSelect={handleSearchableSelect}
              onClear={handleClear(setSearchableValue)}
            />
            {searchableValue && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color--text-tertiary)' }}>
                Selected: {frameworkOptions.find(opt => opt.value === searchableValue)?.label}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Controlled vs Uncontrolled */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Controlled vs Uncontrolled</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Uncontrolled</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color--text-tertiary)', marginBottom: '0.5rem' }}>
              Component manages its own state
            </p>
            <Select
              options={countryOptions}
              placeholder="Select a country..."
              onSelect={(_value, option) => alert(`Selected: ${option.label}`)}
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Controlled</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color--text-tertiary)', marginBottom: '0.5rem' }}>
              Value: "{controlledValue || 'None'}"
            </p>
            <Select
              options={countryOptions}
              value={controlledValue}
              onSelect={handleControlledSelect}
              onClear={handleClear(setControlledValue)}
              placeholder="Controlled select"
            />
          </div>
        </div>
      </section>

      {/* Different Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Different Sizes</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Select component supports all Input component sizes
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Tiny</h4>
            <Select size="tiny" options={fruitOptions} placeholder="Tiny select" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Small</h4>
            <Select size="small" options={fruitOptions} placeholder="Small select" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Medium (Default)</h4>
            <Select size="medium" options={fruitOptions} placeholder="Medium select" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Large</h4>
            <Select size="large" options={fruitOptions} placeholder="Large select" />
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Disabled State</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Select component can be disabled
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Disabled Select</h4>
            <Select
              options={fruitOptions}
              disabled={true}
              placeholder="This select is disabled"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Disabled with Value</h4>
            <Select
              options={fruitOptions}
              value="apple"
              disabled={true}
              placeholder="Disabled with selected value"
            />
          </div>
        </div>
      </section>

      {/* Options with Disabled Items */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Options with Disabled Items</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Individual options can be disabled
        </p>
        
        <Select
          options={[
            { value: 'active1', label: 'Active Option 1' },
            { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
            { value: 'active2', label: 'Active Option 2' },
            { value: 'disabled2', label: 'Disabled Option 2', disabled: true },
            { value: 'active3', label: 'Active Option 3' },
          ]}
          placeholder="Select an option (some are disabled)..."
          onSelect={(_value, option) => alert(`Selected: ${option.label}`)}
        />
      </section>

      {/* Clear Button Behavior */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Clear Button Behavior</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Different clear button configurations
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>With Clear Button (Default)</h4>
            <Select
              options={fruitOptions}
              value={sizeValue}
              onSelect={handleSizeSelect}
              onClear={handleClear(setSizeValue)}
              placeholder="With clear button"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Without Clear Button</h4>
            <Select
              options={fruitOptions}
              value={sizeValue}
              onSelect={handleSizeSelect}
              showClearButton={false}
              placeholder="Without clear button"
            />
          </div>
        </div>
      </section>

      {/* Event Handling */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Event Handling</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Demonstrating various event handlers
        </p>
        
        <Select
          options={frameworkOptions}
          placeholder="Select to see events in console..."
          onSelect={(_value, option) => {
            console.log('onSelect event:', { value: _value, option });
            alert(`Selected: ${option.label}`);
          }}
          onClear={() => {
            console.log('onClear event');
            alert('Selection cleared');
          }}
          onVisibilityChange={(visible) => {
            console.log('onVisibilityChange event:', visible);
          }}
        />
      </section>

      {/* Custom Styling */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Custom Styling</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Select with custom inline styles
        </p>
        
        <Select
          options={fruitOptions}
          placeholder="Custom styled select..."
          style={{
            border: '2px solid var(--color--accent-prime)',
            borderRadius: '12px',
            backgroundColor: 'var(--color--bg-tertiary)',
          }}
          onSelect={(_value, option) => alert(`Selected: ${option.label}`)}
        />
      </section>
    </div>
  );
}; 