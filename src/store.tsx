import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CargoItem, Dataset } from './types';

interface AppContextType {
  capacity: number;
  setCapacity: (cap: number) => void;
  items: CargoItem[];
  setItems: React.Dispatch<React.SetStateAction<CargoItem[]>>;
  addItem: (item: Omit<CargoItem, 'id'>) => void;
  updateItem: (id: string, updated: Partial<CargoItem>) => void;
  deleteItem: (id: string) => void;
  loadDataset: (type: Dataset) => void;
  resetInputs: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [capacity, setCapacity] = useState<number>(50);
  const [items, setItems] = useState<CargoItem[]>([]);

  const addItem = (item: Omit<CargoItem, 'id'>) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
  };

  const updateItem = (id: string, updated: Partial<CargoItem>) => {
    setItems((prev) => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  const loadDataset = (type: Dataset) => {
    if (type === 'small') {
      setCapacity(30);
      setItems([
        { id: crypto.randomUUID(), name: 'Fuel', weight: 10, profit: 60, isSplittable: true },
        { id: crypto.randomUUID(), name: 'Machinery', weight: 20, profit: 100, isSplittable: false },
        { id: crypto.randomUUID(), name: 'Grains', weight: 30, profit: 120, isSplittable: true }
      ]);
    } else if (type === 'divisible_only') {
      setCapacity(50);
      setItems([
        { id: crypto.randomUUID(), name: 'Chemical A', weight: 10, profit: 60, isSplittable: true },
        { id: crypto.randomUUID(), name: 'Chemical B', weight: 20, profit: 100, isSplittable: true },
        { id: crypto.randomUUID(), name: 'Chemical C', weight: 30, profit: 120, isSplittable: true }
      ]);
    } else if (type === 'indivisible_only') {
      setCapacity(50);
      setItems([
        { id: crypto.randomUUID(), name: 'Container A', weight: 10, profit: 60, isSplittable: false },
        { id: crypto.randomUUID(), name: 'Container B', weight: 20, profit: 100, isSplittable: false },
        { id: crypto.randomUUID(), name: 'Container C', weight: 30, profit: 120, isSplittable: false }
      ]);
    }
  };

  const resetInputs = () => {
    setCapacity(50);
    setItems([]);
  };

  return (
    <AppContext.Provider value={{
      capacity, setCapacity, items, setItems, addItem, updateItem, deleteItem, loadDataset, resetInputs
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
