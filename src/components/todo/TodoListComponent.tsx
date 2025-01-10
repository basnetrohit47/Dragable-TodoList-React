import { useEffect, useState } from "react";
import { useTodoStore } from "../../store/todo.store";
import { AddItem } from "./operations/AddItem";
import { TodoItemComponent } from "./TodoItemComponent";
import { TodoField } from "../../schemas/todo.schema";
import { useGenericDrag } from "../../hooks/useGenericDragAndDrop";

export const TodoListComponent = () => {
  const todoList = useTodoStore((state) => state.todos);
  const [todos, setTodos] = useState<TodoField[]>([]);

  useEffect(() => {
    setTodos(todoList);
  }, [todoList]);
  const { handleDragStart, handleDragEnd, handleDragOver } =
    useGenericDrag<TodoField>({
      selectedItemClass: "bg-white",
      childSelector: ".child-item",
      childSelectorStyle: "opacity-0",
      items: todos,
      onDrop: (updatedTodos) => setTodos(updatedTodos),
      getItemId: (todo) => todo.id,
    });

  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="bg-gray-100 w-[450px]  rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.1)] pb-4">
          <h1 className="text-lg text-black mt-6 mb-6 font-bold capitalize">
            Todo list
          </h1>
          {todos?.map((todo) => (
            <TodoItemComponent
              todo={todo}
              key={todo.id}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              handleDragOver={handleDragOver}
            />
          ))}
          <div className="text-left p-2 flex">
            <AddItem />
          </div>
        </div>
      </div>
    </>
  );
};
