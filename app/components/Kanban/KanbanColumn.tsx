import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';

import { parseClassName } from '@/util/parse-class-name';

import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  cardIds: string[];
  children?: (cardId: string) => React.ReactNode;
  renderColumnControls?: (columnId: string) => React.ReactNode;
  renderCardControls?: (cardId: string) => React.ReactNode;
  activeCardId?: string | null;
  activeColumnId?: string | null;
  overCardId?: string | null;
  className?: string;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id,
  title,
  cardIds,
  children,
  renderColumnControls,
  renderCardControls,
  activeCardId,
  // activeColumnId,
  overCardId,
  className,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  // Whether the column is actively being dragged over
  const isActiveDropTarget = isOver;

  // Check if the column should show a placeholder (when dragging over column with no items)
  const shouldShowEmptyColumnPlaceholder =
    isActiveDropTarget && activeCardId && !cardIds.includes(activeCardId) && cardIds.length === 0;

  // Border styling based on drag state
  const dropIndicatorClass = isActiveDropTarget ? 'ring-2 ring-blue-400 dark:ring-blue-500' : '';

  // Determine where to show the placeholder
  const getPlaceholderIndex = () => {
    if (!overCardId || !cardIds.includes(overCardId) || !activeCardId) return -1;
    if (activeCardId === overCardId) return -1; // Don't show placeholder when hovering over itself

    return cardIds.indexOf(overCardId);
  };

  const placeholderIndex = getPlaceholderIndex();

  // Create placeholders with consistent styling
  const renderPlaceholder = () => (
    <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 rounded-md p-3 mb-2 min-h-[80px] animate-pulse">
      <div className="h-4 w-20 bg-blue-200 dark:bg-blue-700 rounded mb-2" />
      <div className="h-3 w-full bg-blue-100 dark:bg-blue-800 rounded" />
    </div>
  );

  const finalClassName = parseClassName('kanban-column-component', className);

  return (
    <div
      className={`${finalClassName} flex flex-col bg-base-200 border border-base-300 rounded-md p-2 h-[80vh] min-h-[600px] min-w-[70vw] lg:min-w-[30vw] xl:min-w-[20vw] relative transition-all duration-150 ${dropIndicatorClass}`}
    >
      <div className="kanban-column-header prose-headings:m-0 flex items-center justify-between mb-2 px-1">
        <h4>{title}</h4>
        {renderColumnControls && <div className="flex">{renderColumnControls(id)}</div>}
      </div>
      <div
        ref={setNodeRef}
        className={`grow overflow-y-auto p-1 ${isOver ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
      >
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {cardIds.map((cardId, index) => (
            <React.Fragment key={cardId}>
              {/* Show placeholder above this card if it's the insertion point */}
              {placeholderIndex === index && renderPlaceholder()}

              <KanbanCard
                id={cardId}
                isActive={activeCardId === cardId}
                isDisabled={activeCardId === cardId}
                renderControls={renderCardControls}
                isOriginalPosition={activeCardId === cardId}
              >
                {children ? children(cardId) : null}
              </KanbanCard>
            </React.Fragment>
          ))}

          {/* If this is the last position and we're hovering, show placeholder at end */}
          {isActiveDropTarget &&
            activeCardId &&
            !cardIds.includes(activeCardId) &&
            cardIds.length > 0 &&
            placeholderIndex === -1 &&
            renderPlaceholder()}
        </SortableContext>

        {/* Placeholder for empty column */}
        {shouldShowEmptyColumnPlaceholder && renderPlaceholder()}

        {/* Empty state indicator */}
        {cardIds.length === 0 && !shouldShowEmptyColumnPlaceholder && (
          <div className="flex items-center justify-center h-20 text-sm text-gray-400 dark:text-gray-500 italic">
            Drop cards here
          </div>
        )}
      </div>
    </div>
  );
};
