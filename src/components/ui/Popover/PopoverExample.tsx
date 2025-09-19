import React, { useState } from 'react';
import { Popover } from './Popover';
import ColorPicker from '../ColorPicker/ColorPicker';



// Example 2: Custom content with manual close
export const CustomContentPopover: React.FC = () => {
  return (
    <Popover
      trigger={
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Open Menu
        </button>
      }
      placement="bottom"
      panelStyle={{ minWidth: '200px' }}
    >
      {(closePopover) => (
        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
            Menu Options
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => {
                console.log('Option 1 selected');
                closePopover();
              }}
              style={{
                padding: '8px 12px',
                border: 'none',
                background: '#f3f4f6',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Option 1
            </button>
            <button
              onClick={() => {
                console.log('Option 2 selected');
                closePopover();
              }}
              style={{
                padding: '8px 12px',
                border: 'none',
                background: '#f3f4f6',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Option 2
            </button>
          </div>
        </div>
      )}
    </Popover>
  );
};

// Example 3: Controlled popover
export const ControlledPopover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#10b981');

  return (
    <div>
      <p>Popover is {isOpen ? 'open' : 'closed'}</p>
      <Popover
        trigger={
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: selectedColor,
                borderRadius: '4px',
                border: '1px solid #e5e7eb',
              }}
            />
            <span>Choose Color</span>
          </div>
        }
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="right"
      >
        <ColorPicker
          value={selectedColor}
          onChange={setSelectedColor}
        />
      </Popover>
    </div>
  );
};

// Example 4: Different placements
export const PlacementExamples: React.FC = () => {
  const placements = ['top', 'bottom', 'left', 'right', 'auto'] as const;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '16px',
      padding: '40px',
    }}>
      {placements.map((placement) => (
        <Popover
          key={placement}
          trigger={
            <button
              style={{
                padding: '8px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              {placement}
            </button>
          }
          placement={placement}
        >
          <div style={{ padding: '8px' }}>
            <p>Popover content for {placement} placement</p>
          </div>
        </Popover>
      ))}
    </div>
  );
};

export default {
  CustomContentPopover,
  ControlledPopover,
  PlacementExamples,
};
