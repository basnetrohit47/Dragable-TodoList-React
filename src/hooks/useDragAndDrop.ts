import { useRef, useState } from "react";
import { TodoField } from "../schemas/todo.schema";

interface Props{
  selectedItemClass?:string, //class for element which is selected
  childSelector?:string,
  todos: TodoField[],
   setTodos: (todos: TodoField[]) => void
  
}
export const useDragAndDrop = ({selectedItemClass="opacity-0",childSelector,todos,setTodos}:Props) => {
  const prevDraggedElement = useRef<HTMLElement | null>(null);
  // const draggingItemId = useRef<number | null>(null);
  const [draggingItemId, setDraggingItemId] = useState<number | null>(null);



  const handleDragStart = (e: React.DragEvent,item: TodoField) => {
     setDraggingItemId(item.id);


    const element = e.currentTarget as HTMLElement;
    const childElement = childSelector?element.querySelector(childSelector):null;

    if(childElement){
      if(selectedItemClass){
        childElement.classList.add(selectedItemClass);
      }
      else{
        element.style.opacity = "0";
      }
      
    }
    else{
      if(selectedItemClass){
        element.classList.add(selectedItemClass);
      }
      else{
        element.style.opacity = "0";
      }
     
    }
  };
  const handleDragOver = (e:React.DragEvent,targetItem: TodoField)=>{
    e.preventDefault();
    if(prevDraggedElement.current){
      prevDraggedElement.current.style.opacity = "1";
    }
    const targetItemElement = e.currentTarget as HTMLElement;
    targetItemElement.style.opacity = "0";
    prevDraggedElement.current = targetItemElement

    handleDrop(e, targetItem);
    

  }
  const handleDragEnd = (e: React.DragEvent) => {
    setDraggingItemId(null);
    const element = e.currentTarget as HTMLElement;
     if(prevDraggedElement.current){
      prevDraggedElement.current.style.opacity = "1";
     }
    const childElement = childSelector?element.querySelector(childSelector):null;
    if(childElement){
      if(selectedItemClass){
        childElement.classList.remove(selectedItemClass);
      }
      else{
        element.style.opacity = "1";
      }
      
    }
    else{
      if(selectedItemClass){
        element.classList.remove(selectedItemClass);
      }
      else{
        element.style.opacity = "1";
      }
     
    }
   
  };

 
  const handleDrop = (e: React.DragEvent, targetItem: TodoField) => {
    e.preventDefault();

    const draggingIndex = todos.findIndex((item) => item.id === draggingItemId);
    const targetIndex = todos.findIndex((item) => item.id === targetItem.id);

    if (draggingIndex !== -1 && targetIndex !== -1) {
      const updatedTodos = [...todos];
      const [draggedTodo] = updatedTodos.splice(draggingIndex, 1);
      updatedTodos.splice(targetIndex, 0, draggedTodo);

      const reorderedTodos = updatedTodos.map((todo, index) => ({
        ...todo,
        position: index + 1,
      }));

      setTodos(reorderedTodos);
    }

   
  };




  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver
  };
};
