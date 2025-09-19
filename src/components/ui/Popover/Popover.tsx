import React, { useState, useRef, useEffect, useCallback, type ReactNode, type CSSProperties } from 'react';
import styles from './Popover.module.css';

export interface PopoverProps {
  /** Element that triggers the popover when clicked */
  trigger: ReactNode;
  /** Content to display inside the popover panel */
  children: ReactNode | ((closePopover: () => void) => ReactNode);
  /** Additional CSS class for the popover panel */
  panelClassName?: string;
  /** Inline styles for the popover panel */
  panelStyle?: CSSProperties;
  /** Position preference for the popover panel */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  /** Offset distance from the trigger element */
  offset?: number;
  /** Whether the popover is initially open */
  defaultOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when popover open state changes */
  onOpenChange?: (isOpen: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  panelClassName = '',
  panelStyle = {},
  placement = 'auto',
  offset = 8,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const [panelPosition, setPanelPosition] = useState<CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = useCallback((open: boolean) => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(open);
    }
    onOpenChange?.(open);
  }, [controlledIsOpen, onOpenChange]);

  const closePopover = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const togglePopover = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  // Calculate panel position
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !panelRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const panelRect = panelRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;
    let actualPlacement = placement;

    // Auto placement logic
    if (placement === 'auto') {
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const spaceRight = viewportWidth - triggerRect.right;
      const spaceLeft = triggerRect.left;

      if (spaceBelow >= panelRect.height + offset) {
        actualPlacement = 'bottom';
      } else if (spaceAbove >= panelRect.height + offset) {
        actualPlacement = 'top';
      } else if (spaceRight >= panelRect.width + offset) {
        actualPlacement = 'right';
      } else if (spaceLeft >= panelRect.width + offset) {
        actualPlacement = 'left';
      } else {
        actualPlacement = 'bottom'; // Default fallback
      }
    }

    // Calculate position based on placement
    switch (actualPlacement) {
      case 'top':
        top = triggerRect.top - panelRect.height - offset;
        left = triggerRect.left + (triggerRect.width - panelRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - panelRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - panelRect.height) / 2;
        left = triggerRect.left - panelRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - panelRect.height) / 2;
        left = triggerRect.right + offset;
        break;
    }

    // Ensure panel stays within viewport
    left = Math.max(8, Math.min(left, viewportWidth - panelRect.width - 8));
    top = Math.max(8, Math.min(top, viewportHeight - panelRect.height - 8));

    setPanelPosition({
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 1000,
    });
  }, [placement, offset]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        triggerRef.current &&
        panelRef.current &&
        !triggerRef.current.contains(target) &&
        !panelRef.current.contains(target)
      ) {
        closePopover();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closePopover]);

  // Calculate position when panel opens or window resizes
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure panel is rendered
      const timer = setTimeout(calculatePosition, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, calculatePosition]);

  useEffect(() => {
    if (isOpen) {
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen, calculatePosition]);

  return (
    <>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onClick={togglePopover}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={panelRef}
          className={`${styles.panel} ${panelClassName}`}
          style={{ ...panelPosition, ...panelStyle }}
          role="dialog"
          aria-modal="false"
        >
          {typeof children === 'function' ? children(closePopover) : children}
        </div>
      )}
    </>
  );
};

export default Popover;
