import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box, Chip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { TodoField } from "../../schemas/todo.schema";
import { useTodoStore } from "../../store/todo.store";
import { getPriority } from "../../utils/getPriorityList";

interface Props {
  todo: TodoField;
  handleDragStart: (e: React.DragEvent, item: TodoField) => void;
  handleDragEnd: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent, targetItem: TodoField) => void;
}
export const TodoItemComponent = ({
  todo,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
}: Props) => {
  const updateTodo = useTodoStore((state) => state.updateItem);
  const priorityList = getPriority();
  const handleCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({ ...todo, completed: event.target.checked });
  };

  return (
    <>
      <Box
        className="bg-gray-200 mx-4 my-2 py-3  p-2 rounded-md flex-col  cursor-pointer border border-gray-300"
        draggable
        onDragStart={(e) => handleDragStart(e, todo)}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => handleDragOver(e, todo)}
      >
        <div className="flex items-start child-item">
          <div className="flex items-start justify-center">
            <Checkbox
              onChange={handleCompleted}
              checked={todo.completed || false}
              className="!text-gray-500 "
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 18 },
              }}
            />

            <p
              className={`  ${
                todo.completed ? "line-through text-gray-400" : "text-gray-700 "
              } capitalize text-left pt-[7px] text-sm pb-2 bold font-medium`}
            >
              {todo.description}
            </p>
          </div>

          <div className="ml-auto flex pr-2 mt-2">
            {todo.priority && todo.priority !== 4 && (
              <Chip
                label={
                  priorityList[todo.priority ? todo.priority - 1 : 3].label
                }
                variant="outlined"
                sx={{ height: "20px" }}
                className={`!text-[10px] mx-4 ${
                  priorityList[todo.priority ? todo.priority - 1 : 3].style
                }`}
              />
            )}

            <DragIndicatorIcon className="text-gray-400  !text-[20px]" />
          </div>
        </div>
      </Box>
    </>
  );
};
