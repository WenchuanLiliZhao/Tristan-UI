import React, {
  useState,
  useRef,
  useLayoutEffect,
  type ReactNode,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import { Icon, type IconProps } from "../../general/Icon";

// ========== Tooltip Item ==========

export interface RichTooltipItemProps {
  icon?: IconProps["name"];
  iconColor?: string;
  label: ReactNode;
  value?: ReactNode;
}

export const RichTooltipItem: React.FC<RichTooltipItemProps> = ({
  icon,
  iconColor,
  label,
  value,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.label}>
        {icon && <Icon name={icon} style={{ color: iconColor }} />}
        <span>{label}</span>
      </div>
      {value && <div className={styles.value}>{value}</div>}
    </div>
  );
};

// ========== Tooltip Container ==========

type Position =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

interface RichTooltipProps {
  children: ReactElement<RichTooltipItemProps>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: ReactElement<any>;
  position?: Position;
  offset?: number;
}

export const RichTooltip: React.FC<RichTooltipProps> = ({
  children,
  trigger,
  position = "bottom-start",
  offset = 8,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const triggerElement = React.cloneElement(trigger, {
    ref: triggerRef,
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => setIsVisible(false),
  });

  return (
    <>
      {triggerElement}
      {isVisible && (
        <TooltipPortal
          triggerRef={triggerRef}
          tooltipRef={tooltipRef}
          position={position}
          offset={offset}
        >
          <div className={styles.container}>{children}</div>
        </TooltipPortal>
      )}
    </>
  );
};

// ========== Portal for Positioning ==========

interface TooltipPortalProps {
  children: ReactNode;
  triggerRef: React.RefObject<HTMLElement | null>;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  position: Position;
  offset: number;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({
  children,
  triggerRef,
  tooltipRef,
  position,
  offset,
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      const {
        top: triggerTop,
        left: triggerLeft,
        width: triggerWidth,
        height: triggerHeight,
      } = triggerRect;
      const { width: tooltipWidth, height: tooltipHeight } = tooltipRect;

      switch (position) {
        case "bottom-start":
          top = triggerTop + triggerHeight + offset;
          left = triggerLeft;
          break;
        case "bottom-end":
          top = triggerTop + triggerHeight + offset;
          left = triggerLeft + triggerWidth - tooltipWidth;
          break;
        case "top-start":
          top = triggerTop - tooltipHeight - offset;
          left = triggerLeft;
          break;
        case "top-end":
          top = triggerTop - tooltipHeight - offset;
          left = triggerLeft + triggerWidth - tooltipWidth;
          break;
        case "right-start":
          top = triggerTop;
          left = triggerLeft + triggerWidth + offset;
          break;
        case "right-end":
          top = triggerTop + triggerHeight - tooltipHeight;
          left = triggerLeft + triggerWidth + offset;
          break;
        case "left-start":
          top = triggerTop;
          left = triggerLeft - tooltipWidth - offset;
          break;
        case "left-end":
          top = triggerTop + triggerHeight - tooltipHeight;
          left = triggerLeft - tooltipWidth - offset;
          break;
      }

      setCoords({ top: top + window.scrollY, left: left + window.scrollX });
    }
  }, [triggerRef, tooltipRef, position, offset]);

  return createPortal(
    <div
      ref={tooltipRef}
      className={styles.portal}
      style={{ top: coords.top, left: coords.left }}
    >
      {children}
    </div>,
    document.body
  );
};
