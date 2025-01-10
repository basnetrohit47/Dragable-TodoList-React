export const getPriority = ()=>{
    return  [
        { label: "", style: "!bg-gray-100 !border-gray-500 !border-none" },
        { label: "high", style: "!bg-red-100 !border-red-500 !text-red-500" },
        {
          label: "medium",
          style: "!bg-orange-100 !border-yellow-500 !text-yellow-700",
        },
        { label: "low", style: "!bg-blue-100 !border-blue-500 !text-blue-500" },
        { label: "", style: "!bg-gray-100 !border-gray-500 !border-none" },
      ];
}