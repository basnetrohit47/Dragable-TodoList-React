import { create } from "zustand";
import {  CreateTodoField, TodoField } from "../schemas/todo.schema";

interface TodoStore {
    todos:TodoField[],
    addItem:(newTodo:CreateTodoField)=>void,
    removeItem:(id:number)=>void,
    updateItem:(updatedTodo:TodoField)=>void,
    reorderPosition:(selected:TodoField,target:TodoField)=>void,
 }

export const useTodoStore = create<TodoStore>((set)=>({
    todos:[{id:1,description:"Take the dog out",position:1,priority:1},{id:2,description:"Buy a gift for Juni",position:2,priority:3},{id:3,description:"Call pierre at 2pm",position:3,priority:2},{id:4,description:"Go for running",position:1}],
    addItem:(newTodo)=>set((state)=>({
        todos:[...state.todos,{...newTodo,id:Date.now(),position:state.todos.length+1 }]
    })),
    removeItem:(id)=>set((state)=>({
        todos:state.todos.filter(todo=>todo.id!==id)
    })),
    updateItem:(updatedTodo)=>set((state)=>({
        todos:state.todos.map(todo=>todo.id===updatedTodo.id?{...todo,...updatedTodo}:todo)
    })),
    reorderPosition: (selected, target) =>
        set((state) => {
          // Ensure positions exist
          if (selected.position === undefined || target.position === undefined) {
            console.warn("Selected or target position is undefined");
            return { todos: state.todos }; // Exit early without making changes
          }
      
          const newTodos = state.todos.map((item) => {
            if (item.id === selected.id) {
              // Move the selected item to the target's position
              return { ...item, position: target.position };
            }
      
            if (
              selected.position < target.position && // Moving down
              item.position > selected.position &&
              item.position <= target.position
            ) {
              // Shift items up in range
              return { ...item, position: item.position - 1 };
            }
      
            if (
              selected.position > target.position && // Moving up
              item.position >= target.position &&
              item.position < selected.position
            ) {
              // Shift items down in range
              return { ...item, position: item.position + 1 };
            }
      
            // Unaffected items remain the same
            return item;
          });
      
          return {
            todos: newTodos.sort((a, b) => a.position - b.position), // Ensure order by position
          };
        })
      

}))
