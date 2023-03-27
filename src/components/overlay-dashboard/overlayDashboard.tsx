import { ElementInitialType } from "@/pages";
import { ChangeEvent, useState } from "react";

const ElemetsOptions = [
  {
    name: "Chat Box",
    id: "chat_box",
    height: 200,
    width: 320,
    x: 320,
    y: 0,
  },
  {
    name: "Featured Chat",
    id: "featured_chat",
    height: 200,
    width: 320,
    x: 320 * 2,
    y: 0,
  },
  {
    name: "Subscriber Alert",
    id: "subscriber_alert",
    height: 200,
    width: 320,
    x: 320 * 2,
    y: 0,
  },
];

const OverlayDashboard = ({
  addElement,
  onSubmit,
  onRemove,
}: {
  addElement: (element: ElementInitialType) => void;
  onSubmit: () => void;
  onRemove: () => void;
}) => {
  const [elementOptionsList, setElementOptionsList] =
    useState<ElementInitialType[]>(ElemetsOptions);

  const handleAddElement = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedElement = e.currentTarget.value;
    const currentElementFiltered = elementOptionsList.filter(
      (element) => element.id === selectedElement
    )[0];
    if (currentElementFiltered) {
      addElement(currentElementFiltered);
    }
    const leftElementList = elementOptionsList.filter(
      (element) => element.id !== selectedElement
    );
    setElementOptionsList(leftElementList);
  };

  return (
    <div className="w-80 min-w-[20rem] bg-gray-500 flex flex-col items-center py-4">
      {/* <input
        className="border-2 border-black my-2 w-3/4 text-2xl p-2"
        value={elementName}
        onChange={(e) => setElementName(e.currentTarget.value)}
      /> */}
      <select
        className="border-2 border-black my-2 w-3/4 text-xl p-2 text-center"
        value={""}
        onChange={handleAddElement}
        disabled={!elementOptionsList.length}
      >
        <option disabled value="">
          Add Element
        </option>
        {elementOptionsList.map((element) => (
          <option key={element.id} value={element.id}>
            {element.name}
          </option>
        ))}
      </select>
      {/* <button
        className="p-2 bg-blue-400 border-2 border-black"
        onClick={handleAddElement}
        disabled={!selectedElement}
      >
        Add Element
      </button> */}
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
