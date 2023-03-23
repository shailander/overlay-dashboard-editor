import { useState } from "react";

const OverlayDashboard = ({
  addElement,
  onSubmit,
  onRemove,
}: {
  addElement: (name: string) => void;
  onSubmit: () => void;
  onRemove: () => void;
}) => {
  const [elementName, setElementName] = useState("");

  const handleAddElement = () => {
    addElement(elementName);
    setElementName("");
  };

  return (
    <div className="w-80 bg-gray-500 flex flex-col items-center py-4">
      <input
        className="border-2 border-black my-2 w-3/4 text-2xl p-2"
        value={elementName}
        onChange={(e) => setElementName(e.currentTarget.value)}
      />
      <button
        className="p-2 bg-blue-400 border-2 border-black"
        onClick={handleAddElement}
        disabled={!elementName.length}
      >
        Add Element
      </button>
      <button
        className="p-2 mt-4 bg-red-400 border-2 border-black"
        onClick={onRemove}
        onMouseDown={(e) => e.stopPropagation()}
      >
        Remove Element
      </button>
      <button
        className="mt-4 px-4 py-2 bg-green-300 border-2 border-black"
        onClick={onSubmit}
      >
        SAVE
      </button>
    </div>
  );
};
export default OverlayDashboard;
