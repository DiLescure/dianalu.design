import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useState } from 'react';

import { parseClassName } from '@/util/parse-class-name';

import { KanbanColumn } from './KanbanColumn';
import { useKanban } from './KanbanContext';

interface KanbanBoardProps {
  children?: (columnId: string, cardIds: string[]) => React.ReactNode;
  renderColumnControls?: (columnId: string) => React.ReactNode;
  renderCardControls?: (cardId: string) => React.ReactNode;
  renderBoardControls?: () => React.ReactNode;
  title?: string;
  className?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  children,
  renderColumnControls,
  renderCardControls,
  renderBoardControls,
  title = 'Kanban Board',
  className,
}) => {
  const { cards, columns, moveCard, reorderCards } = useKanban();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 5 pixels before activating for better precision
    activationConstraint: {
      distance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 200ms for better responsiveness, with tolerance of 5px
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  // Get card IDs for each column
  const getCardIdsForColumn = (columnId: string) => {
    return cards.filter((card) => card.columnId === columnId).map((card) => card.id);
  };

  // Find the column a card belongs to
  const findColumnOfCard = (cardId: string) => {
    const card = cards.find((card) => card.id === cardId);
    return card ? card.columnId : null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());

    // Store the column the dragged card is coming from
    const columnId = findColumnOfCard(active.id.toString());
    setActiveColumn(columnId);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      setOverId(null);
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Only set the overId if it's different from the active card
    // and it's either a column or another card (not the active card)
    if (activeId !== overId) {
      setOverId(overId);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const activeId = active.id.toString();
      const overId = over.id.toString();
      const activeColumnId = findColumnOfCard(activeId);
      const isOverColumn = columns.some((col) => col.id === overId);

      if (isOverColumn) {
        // Card was dropped on a column
        moveCard(activeId, overId);
      } else {
        // Card was dropped on another card, check if same column or different
        const overColumnId = findColumnOfCard(overId);

        if (activeColumnId && overColumnId && activeColumnId === overColumnId) {
          // Card was dropped within same column, reorder
          const columnCards = getCardIdsForColumn(activeColumnId);
          const activeIndex = columnCards.indexOf(activeId);
          const overIndex = columnCards.indexOf(overId);

          if (activeIndex !== -1 && overIndex !== -1) {
            const newOrder = arrayMove(columnCards, activeIndex, overIndex);
            reorderCards(activeColumnId, newOrder);
          }
        } else if (overColumnId) {
          // Card was dropped on a card in a different column
          // Move to that column and place before the target card
          const targetColumnCards = getCardIdsForColumn(overColumnId);
          const overIndex = targetColumnCards.indexOf(overId);

          if (overIndex !== -1) {
            // Move the card to the new column first
            moveCard(activeId, overColumnId);

            // Then, reorder within the column to place it before the target card
            const updatedColumnCards = getCardIdsForColumn(overColumnId);
            const newActiveIndex = updatedColumnCards.indexOf(activeId);

            if (newActiveIndex !== -1 && newActiveIndex !== overIndex) {
              const newOrder = arrayMove(updatedColumnCards, newActiveIndex, overIndex);
              reorderCards(overColumnId, newOrder);
            }
          }
        }
      }
    }

    // Reset active states
    setActiveId(null);
    setActiveColumn(null);
    setOverId(null);
  };

  // Custom collision detection to prioritize drop zones
  const collisionDetection = (args: any) => {
    // First, try to find collisions with pointerWithin
    const pointerCollisions = pointerWithin(args);

    // If we have any pointerCollisions, return those
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    // Otherwise, fall back to rectIntersection
    return rectIntersection(args);
  };

  const finalClassName = parseClassName('kanban-board-component', className);

  return (
    <div className={`${finalClassName} flex flex-col h-full`}>
      <div className="kanban-board-header prose-headings:m-0 prose-headings:p-0 flex justify-between items-center mb-4 p-2">
        <h3>{title}</h3>
        {renderBoardControls && <div className="flex items-center">{renderBoardControls()}</div>}
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns.map((col) => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="overflow-x-auto p-2 pb-4">
            <div className="flex gap-4">
              {columns.map((column) => {
                const columnCardIds = getCardIdsForColumn(column.id);
                return (
                  <KanbanColumn
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    cardIds={columnCardIds}
                    renderColumnControls={renderColumnControls}
                    renderCardControls={renderCardControls}
                    activeCardId={activeId}
                    activeColumnId={activeColumn}
                    overCardId={overId}
                  >
                    {children ? (cardId) => children(column.id, [cardId]) : undefined}
                  </KanbanColumn>
                );
              })}
              <div className="block min-w-1"> </div>
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
