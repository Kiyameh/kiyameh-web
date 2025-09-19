import { useState } from "react";
import { Popover } from "../Popover/Popover";
import ColorPicker from "./ColorPicker";

interface DualColorPopoverProps {
  initialSurfaceColor?: string;
  initialContentColor?: string;
  onSurfaceColorChange?: (color: string) => void;
  onContentColorChange?: (color: string) => void;
  onChange?: (colors: { surfaceColor: string; contentColor: string }) => void;
}

export default function DualColorPopover({
  initialSurfaceColor = '#ffffff',
  initialContentColor = '#000000',
  onSurfaceColorChange,
  onContentColorChange,
  onChange
}: DualColorPopoverProps) {
  const [surfaceColor, setSurfaceColor] = useState(initialSurfaceColor);
  const [contentColor, setContentColor] = useState(initialContentColor);
  const [activeTab, setActiveTab] = useState<'surface' | 'content'>('surface');

  const handleSurfaceColorChange = (color: string) => {
    setSurfaceColor(color);
    onSurfaceColorChange?.(color);
    onChange?.({ surfaceColor: color, contentColor });
  };

  const handleContentColorChange = (color: string) => {
    setContentColor(color);
    onContentColorChange?.(color);
    onChange?.({ surfaceColor, contentColor: color });
  };

  return (
    <Popover
      trigger={
        <button
          style={{
            backgroundColor: surfaceColor,
            color: contentColor,
            width: '40px',
            height: '40px',
            border: '2px solid var(--content)',
            borderRadius: 'var(--radius-medium)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '34px',
            fontWeight: '900',
            fontFamily: 'var(--font-sans)',
          }}
          aria-label="Select surface and content colors"
        >
          A
        </button>
      }
      placement="bottom"
    >
      {() => (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minWidth: '280px'
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            borderRadius: 'var(--radius-medium)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            marginBottom: '1rem',
          }}>
            <button
              onClick={() => setActiveTab('surface')}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                border: 'none',
                backgroundColor: activeTab === 'surface' ? 'var(--primary)' : 'var(--surface-200)',
                color: activeTab === 'surface' ? 'var(--primary-content)' : 'var(--content)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'surface' ? '600' : '400',
                transition: 'all 0.2s ease',
              }}
            >
              Surface
            </button>
            <button
              onClick={() => setActiveTab('content')}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                border: 'none',
                backgroundColor: activeTab === 'content' ? 'var(--primary)' : 'var(--surface-200)',
                color: activeTab === 'content' ? 'var(--primary-content)' : 'var(--content)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'content' ? '600' : '400',
                transition: 'all 0.2s ease',
              }}
            >
              Content
            </button>
          </div>



          {/* Color Picker */}
          {activeTab === 'surface' && (
            <ColorPicker
              value={surfaceColor}
              onChange={handleSurfaceColorChange}
            />
          )}

          {activeTab === 'content' && (
            <ColorPicker
              value={contentColor}
              onChange={handleContentColorChange}
            />
          )}
        </div>
      )}
    </Popover>
  );
};