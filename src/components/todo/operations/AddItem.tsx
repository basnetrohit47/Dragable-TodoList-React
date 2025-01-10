import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useTodoStore } from "../../../store/todo.store";

export const AddItem = () => {
  const addTodoItem = useTodoStore((state) => state.addItem);
  const [newTodoItem, setNewTodoItem] = useState<string>("");
  const handleNewTodoItem = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setNewTodoItem(e.target.value);
  };
  const submitNewTodoItem = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      addTodoItem({ description: newTodoItem, priority: priority });
      setNewTodoItem("");
      setPriority(3);
    }
  };
  const [priority, setPriority] = useState(3);
  const handlePriorityChange = (e: SelectChangeEvent<number>) => {
    setPriority(Number(e.target.value));
  };
  return (
    <>
      <TextField
        value={newTodoItem}
        onChange={handleNewTodoItem}
        onKeyDown={submitNewTodoItem}
        placeholder="New item"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={priority}
        className="ml-auto  !text-gray-400"
        onChange={handlePriorityChange}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Removes the outline
          },
        }}
      >
        <MenuItem value={4}>Very-low</MenuItem>
        <MenuItem value={3}>Low</MenuItem>
        <MenuItem value={2}>Medium</MenuItem>
        <MenuItem value={1}>High</MenuItem>
      </Select>
    </>
  );
};
