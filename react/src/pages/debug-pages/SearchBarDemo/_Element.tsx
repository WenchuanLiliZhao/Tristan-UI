import React, { useState } from 'react';
import { SearchBar } from '../../../design-system/ui-components';

export const Element: React.FC = () => {
  const [controlledValue, setControlledValue] = useState('');
  const [buttonValue, setButtonValue] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleStandardSearch = (value: string) => {
    console.log('Standard search:', value);
    setSearchResults([`Result for "${value}" 1`, `Result for "${value}" 2`, `Result for "${value}" 3`]);
  };

  const handleControlledSearch = async (value: string) => {
    console.log('Controlled search:', value);
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults([`API Result for "${value}" 1`, `API Result for "${value}" 2`]);
      setIsSearching(false);
    }, 1000);
  };

  const handleButtonClick = () => {
    console.log('Button search clicked');
    alert('This would open a fullscreen search modal!');
    setButtonValue('Advanced filters applied');
  };

  const handleClear = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    return () => {
      setter('');
      setSearchResults([]);
    };
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>SearchBar Component Demo</h1>
      
      {/* Basic Usage */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Basic Usage</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Basic search bar with default settings
        </p>
        
        <SearchBar 
          placeholder="Search anything..."
          onSearch={handleStandardSearch}
        />
        
        {searchResults.length > 0 && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            backgroundColor: 'var(--color--bg-secondary)', 
            borderRadius: '6px',
            border: '1px solid var(--color--border-prime)'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Search Results:</h4>
            {searchResults.map((result, index) => (
              <div key={index} style={{ padding: '0.25rem 0', color: 'var(--color--text-secondary)' }}>
                {result}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Variants */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Variants</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Outlined (Default)</h4>
            <SearchBar variant="outlined" placeholder="Outlined search bar" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Filled</h4>
            <SearchBar variant="filled" placeholder="Filled search bar" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Ghost</h4>
            <SearchBar variant="ghost" placeholder="Ghost search bar" />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Tiny</h4>
            <SearchBar size="tiny" placeholder="Tiny search" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Small</h4>
            <SearchBar size="small" placeholder="Small search" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Medium (Default)</h4>
            <SearchBar size="medium" placeholder="Medium search" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Large</h4>
            <SearchBar size="large" placeholder="Large search" />
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
            <SearchBar 
              placeholder="Type and press Enter..."
              onSearch={(value) => alert(`Uncontrolled search: ${value}`)}
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Controlled</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color--text-tertiary)', marginBottom: '0.5rem' }}>
              Value: "{controlledValue}" | Loading: {isSearching ? 'Yes' : 'No'}
            </p>
            <SearchBar 
              value={controlledValue}
              onChange={(value) => setControlledValue(value)}
              onSearch={handleControlledSearch}
              onClear={handleClear(setControlledValue)}
              placeholder={isSearching ? "Searching..." : "Controlled search"}
              disabled={isSearching}
            />
          </div>
        </div>
      </section>

      {/* Button Mode */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Mode (useAsButton)</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          When useAsButton is true, the search bar acts as a trigger for complex search interfaces like modals or navigation.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Basic Button Mode</h4>
            <SearchBar 
              useAsButton
              placeholder="Click to open advanced search"
              onClick={handleButtonClick}
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>With Value Display</h4>
            <SearchBar 
              useAsButton
              placeholder="No filters applied"
              value={buttonValue}
              onClick={handleButtonClick}
              onClear={handleClear(setButtonValue)}
            />
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Special Features</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Auto Focus</h4>
            <SearchBar 
              autoFocus
              placeholder="Auto focused on mount"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Disabled State</h4>
            <SearchBar 
              disabled
              value="Disabled search bar"
              placeholder="Cannot interact"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>No Clear Button</h4>
            <SearchBar 
              showClearButton={false}
              placeholder="No clear button shown"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Custom Events</h4>
            <SearchBar 
              placeholder="Check console for events"
              onFocus={() => console.log('SearchBar focused')}
              onBlur={() => console.log('SearchBar blurred')}
              onChange={(value) => console.log('SearchBar changed:', value)}
              onSearch={(value) => console.log('SearchBar search:', value)}
              onClear={() => console.log('SearchBar cleared')}
            />
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Keyboard Shortcuts</h2>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'var(--color--bg-secondary)', 
          borderRadius: '6px',
          border: '1px solid var(--color--border-prime)',
          marginBottom: '1rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Available Shortcuts:</h4>
          <ul style={{ margin: '0', paddingLeft: '1.5rem', color: 'var(--color--text-secondary)' }}>
            <li><strong>Enter</strong>: Trigger search</li>
            <li><strong>Escape</strong>: Clear input (when clear button is enabled)</li>
            <li><strong>Tab</strong>: Navigate to/from component</li>
          </ul>
        </div>
        
        <SearchBar 
          placeholder="Try Enter to search, Escape to clear"
          onSearch={(value) => alert(`Keyboard search: ${value}`)}
        />
      </section>

      {/* Integration Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Integration Examples</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Search with filters */}
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-secondary)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-prime)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>Search with Filter Indicator</h4>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <SearchBar 
                variant="filled"
                placeholder="Search products..."
                style={{ flex: '1', minWidth: '200px' }}
              />
              <div style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: 'var(--color--semantic-active-pale)', 
                color: 'var(--color--semantic-active)',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                3 filters active
              </div>
            </div>
          </div>
          
          {/* Search in navigation */}
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-secondary)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-prime)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>Navigation Bar Integration</h4>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--color--bg-prime)',
              borderRadius: '6px',
              border: '1px solid var(--color--border-prime)'
            }}>
              <div style={{ color: 'var(--color--text-prime)', fontWeight: 'bold' }}>Logo</div>
              <SearchBar 
                size="small"
                variant="ghost"
                placeholder="Search..."
                style={{ width: '300px' }}
              />
              <div style={{ color: 'var(--color--text-secondary)' }}>Menu</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 