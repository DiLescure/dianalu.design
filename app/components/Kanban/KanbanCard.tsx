import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { forwardRef } from 'react';

import { parseClassName } from '@/util/parse-class-name';

interface KanbanCardProps {
  id: string;
  children?: React.ReactNode;
  renderControls?: (id: string) => React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  isOverlay?: boolean;
  isOriginalPosition?: boolean;
  className?: string;
}

export const KanbanCard = forwardRef<HTMLDivElement, KanbanCardProps>(
  (
    {
      id,
      children,
      renderControls,
      // isActive,
      isDisabled,
      isOverlay,
      isOriginalPosition,
      className,
    },
    ref,
  ) => {
    // Use the sortable hook instead of the draggable hook
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id,
      disabled: isDisabled || isOverlay,
    });

    const style =
      transform && !isOverlay
        ? {
            transform: CSS.Transform.toString(transform),
            transition,
            zIndex: isDragging ? 999 : undefined,
          }
        : undefined;

    // Display the original position placeholder when this card is being dragged
    if (isOriginalPosition) {
      return (
        <div className="h-0 invisible">{/* Empty placeholder showing original position */}</div>
      );
    }

    // Apply special styling for the overlay card
    const overlayClasses = isOverlay ? 'shadow-xl ring-2 ring-blue-400 dark:ring-blue-500' : '';

    const finalClassName = parseClassName('kanban-card-component', className);

    return (
      <div
        ref={(node) => {
          setNodeRef(node);
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={style}
        className={`${finalClassName} bg-base-100 border border-base-300 shadow dark:shadow-gray-700 rounded-md p-3 mb-2 min-h-[80px] w-full relative transition-all ${
          isDragging ? 'opacity-50 shadow-lg scale-105' : ''
        } ${overlayClasses} ${!isOverlay ? 'cursor-grab' : ''}`}
        {...(!isOverlay ? listeners : {})}
        {...(!isOverlay ? attributes : {})}
      >
        {children}
        {renderControls && !isOverlay && (
          <div className="w-full border-t border-gray-200 dark:border-gray-700">
            {renderControls(id)}
          </div>
        )}
      </div>
    );
  },
);

KanbanCard.displayName = 'KanbanCard';
