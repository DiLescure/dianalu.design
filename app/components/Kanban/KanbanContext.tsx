import { createContext, type ReactNode, use, useState } from 'react';

import { uid } from '@/util';

import type { KanbanCardType, KanbanColumnType } from './types';

interface KanbanContextType {
  cards: KanbanCardType[];
  columns: KanbanColumnType[];
  addCard: (columnId: string) => void;
  removeCard: (cardId: string) => void;
  addColumn: () => void;
  removeColumn: (columnId: string) => void;
  moveCard: (cardId: string, destinationColumnId: string) => void;
  updateColumnTitle: (columnId: string, title: string) => void;
  reorderCards: (columnId: string, newOrder: string[]) => void;
}

const genId = () => uid.stamp(10);

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export const useKanban = () => {
  const context = use(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};

interface KanbanProviderProps {
  children: ReactNode;
  initialCards?: KanbanCardType[];
  initialColumns?: KanbanColumnType[];
}

// Create the provider component
const KanbanProviderComponent = ({
  children,
  initialCards = [],
  initialColumns = [{ id: `column-${genId()}`, title: 'To Do' }],
}: KanbanProviderProps) => {
  const [cards, setCards] = useState<KanbanCardType[]>(initialCards);
  const [columns, setColumns] = useState<KanbanColumnType[]>(initialColumns);

  const addCard = (columnId: string) => {
    const newCard: KanbanCardType = {
      id: `card-${genId()}`,
      columnId,
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (cardId: string) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const addColumn = () => {
    if (columns.length >= 10) return; // Max 10 columns
    const newColumn: KanbanColumnType = {
      id: `column-${genId()}`,
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (columnId: string) => {
    if (columns.length <= 1) return; // Min 1 column

    // Move cards from this column to the first available column
    const firstAvailableColumn = columns.find((col) => col.id !== columnId);
    if (firstAvailableColumn) {
      setCards(
        cards.map((card) =>
          card.columnId === columnId ? { ...card, columnId: firstAvailableColumn.id } : card,
        ),
      );
    }

    setColumns(columns.filter((column) => column.id !== columnId));
  };

  const moveCard = (cardId: string, destinationColumnId: string) => {
    setCards(
      cards.map((card) => (card.id === cardId ? { ...card, columnId: destinationColumnId } : card)),
    );
  };

  const updateColumnTitle = (columnId: string, title: string) => {
    setColumns(columns.map((column) => (column.id === columnId ? { ...column, title } : column)));
  };

  // New function to reorder cards within a column
  const reorderCards = (columnId: string, newOrder: string[]) => {
    // Create a mapping of card ID to index
    const orderMap = new Map<string, number>();
    newOrder.forEach((cardId, index) => {
      orderMap.set(cardId, index);
    });

    // Reorder the cards array based on the new order
    const updatedCards = [...cards];
    updatedCards.sort((a, b) => {
      // Only sort cards in the specified column
      if (a.columnId === columnId && b.columnId === columnId) {
        const indexA = orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
        const indexB = orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
        return indexA - indexB;
      }
      return 0;
    });

    setCards(updatedCards);
  };

  return (
    <KanbanContext.Provider
      value={{
        cards,
        columns,
        addCard,
        removeCard,
        addColumn,
        removeColumn,
        moveCard,
        updateColumnTitle,
        reorderCards,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

// Add Consumer to the provider component
export const KanbanProvider = Object.assign(KanbanProviderComponent, {
  Consumer: KanbanContext.Consumer,
});
