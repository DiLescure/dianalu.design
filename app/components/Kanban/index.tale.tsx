import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { z } from 'zod';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { KanbanBoard, KanbanCard, KanbanProvider, useKanban } from '@/components/Kanban';
import type { TaleContent } from '@/components/Taleforge/types';

const tale: TaleContent = {
  taleComponent: () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeColumn, setActiveColumn] = useState<string | null>(null);

    // Enhanced sensors configuration for better touch/mouse handling
    const mouseSensor = useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    });

    const touchSensor = useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    });

    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    // Simple card content with some interactivity
    const CardContent = ({ cardId, columnId }: { cardId: string; columnId: string }) => {
      const displayId = cardId.replace('card-', '');

      return (
        <div className="p-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
              #{displayId.slice(-4)}
            </span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
              {columnId.replace('column-', 'Col ')}
            </span>
          </div>

          <h4>Task {displayId}</h4>
        </div>
      );
    };

    // Define custom controls for the Kanban components
    const BoardControlsWrapper = () => {
      const { columns, addColumn } = useKanban();

      if (columns.length >= 10) return null;

      return (
        <Button
          onPress={addColumn}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center"
        >
          <Icon name="add" />
        </Button>
      );
    };

    const renderBoardControls = () => <BoardControlsWrapper />;

    const ColumnControlsWrapper = ({ columnId }: { columnId: string }) => {
      const { addCard, removeColumn, columns } = useKanban();

      return (
        <>
          <Button
            onPress={() => addCard(columnId)}
            className="h-6 w-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 rounded-full"
          >
            <Icon name="add" />
          </Button>
          {columns.length > 1 && (
            <Button
              onPress={() => removeColumn(columnId)}
              className="h-6 w-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full ml-1"
            >
              <Icon name="delete" />
            </Button>
          )}
        </>
      );
    };

    const renderColumnControls = (columnId: string) => (
      <ColumnControlsWrapper columnId={columnId} />
    );

    const CardControlsWrapper = ({ cardId }: { cardId: string }) => {
      const { removeCard } = useKanban();

      return (
        <Button
          onPress={() => removeCard(cardId)}
          className="h-6 w-6 flex items-center justify-center text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full"
        >
          <Icon name="delete" />
        </Button>
      );
    };

    const renderCardControls = (cardId: string) => <CardControlsWrapper cardId={cardId} />;

    // Find the column a card belongs to
    const findColumnOfCard = (cardId: string) => {
      const { cards } = useKanban();
      const card = cards.find((card) => card.id === cardId);
      return card ? card.columnId : null;
    };

    // Callback to handle active card being dragged
    const handleDragStart = (event: any) => {
      const { active } = event;
      setActiveId(active.id.toString());

      // Store the column the dragged card is coming from
      const columnId = findColumnOfCard(active.id.toString());
      setActiveColumn(columnId);
    };

    // Reset the drag state when complete
    const handleDragEnd = () => {
      setActiveId(null);
      setActiveColumn(null);
    };

    return (
      <div className="max-w-7xl mx-auto">
        <div className="prose-headings:m-0 bg-base-100 border border-base-300 shadow-md dark:shadow-gray-700 rounded-lg p-6 mb-6">
          <h2>Interactive Kanban Board</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">This demo allows you to:</p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1 mb-4">
            <li>Add/remove cards (from zero to infinity)</li>
            <li>Add/remove columns (from 1 to 10)</li>
            <li>Drag and drop cards between columns</li>
            <li>Reorder cards within a column with clear placeholders</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-600 p-4 text-blue-700 dark:text-blue-300">
            <p className="font-medium">Developer Note:</p>
            <p className="text-sm">
              Features an intuitive drag-and-drop experience with clear visual placeholders showing
              exactly where cards will be placed.
            </p>
          </div>
        </div>

        <KanbanProvider>
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragCancel={handleDragEnd}
            onDragEnd={handleDragEnd}
          >
            <KanbanBoard
              renderBoardControls={renderBoardControls}
              renderColumnControls={renderColumnControls}
              renderCardControls={renderCardControls}
            >
              {(columnId, cardIds) => {
                return <CardContent cardId={cardIds[0]} columnId={columnId} />;
              }}
            </KanbanBoard>

            <DragOverlay
              dropAnimation={{
                duration: 150,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
              }}
            >
              {activeId ? (
                <div className="w-72 transform scale-105 shadow-xl">
                  <KanbanCard id={activeId} isOverlay={true}>
                    <CardContent cardId={activeId} columnId={activeColumn || ''} />
                  </KanbanCard>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </KanbanProvider>
      </div>
    );
  },
  defaultValues: {},
  schema: z.object({}),
};

export default tale;
