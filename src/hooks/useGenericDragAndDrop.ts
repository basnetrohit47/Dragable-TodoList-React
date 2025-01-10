import { useRef, useState } from "react";

interface DragAndDropProps<T> {
  selectedItemClass?: string; // Class for element which is selected
  childSelector?: string; // Selector for child element to style
  items: T[]; // List of items to manage
  onDrop: (updatedItems: T[]) => void; // Callback to handle updated items
  getItemId: (item: T) => number; // Function to extract unique ID from an item
  updateItemPosition?: (items: T[], draggedId: number, targetId: number) => T[]; // Custom reordering logic
}

export const useGenericDrag = <T>({
  selectedItemClass,
  childSelector,
  items,
  onDrop,
  getItemId,
  updateItemPosition,
}: DragAndDropProps<T>) => {
  const prevDraggedElement = useRef<HTMLElement | null>(null);
  const [draggingItemId, setDraggingItemId] = useState<number | null>(null);

  const defaultReorder = (items: T[], draggedId: number, targetId: number): T[] => {
    const draggingIndex = items.findIndex((item) => getItemId(item) === draggedId);
    const targetIndex = items.findIndex((item) => getItemId(item) === targetId);

    if (draggingIndex === -1 || targetIndex === -1) return items;

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggingIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);

    return updatedItems;
  };

  const handleDragStart = (e: React.DragEvent, item: T) => {
    setDraggingItemId(getItemId(item));

    const element = e.currentTarget as HTMLElement;
    const childElement = childSelector ? element.querySelector(childSelector) : null;

    if (childElement) {
      childElement.classList.add(selectedItemClass??"");
    } else {
      element.classList.add(selectedItemClass??"")
     
    }
  };

  const handleDragOver = (e: React.DragEvent, targetItem: T) => {
    e.preventDefault();

    if (prevDraggedElement.current) {
      prevDraggedElement.current.style.opacity = "1";
    }

    const targetItemElement = e.currentTarget as HTMLElement;
    targetItemElement.style.opacity = "0";
    prevDraggedElement.current = targetItemElement;

    if (draggingItemId !== null) {
      const updatedItems = updateItemPosition
        ? updateItemPosition(items, draggingItemId, getItemId(targetItem))
        : defaultReorder(items, draggingItemId, getItemId(targetItem));

      onDrop(updatedItems);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggingItemId(null);
    const element = e.currentTarget as HTMLElement;

    if (prevDraggedElement.current) {
      prevDraggedElement.current.style.opacity = "1";
    }

    const childElement = childSelector ? element.querySelector(childSelector) : null;

    if (childElement) {
      childElement.classList.remove(selectedItemClass??"");
    } else {
      element.style.opacity = "1";
    }
  };

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};