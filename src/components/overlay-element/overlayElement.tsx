import { ElementInitialType, PartialElementPositionType } from "@/pages";
import React, { RefObject, useEffect, useState } from "react";
import { Rnd } from "react-rnd";

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const OverlayElement = ({
  element,
  updatePosition,
  parentContainerRef,
  currentSelectedElement,
  updateCurrentSelectedElement,
}: {
  element: ElementInitialType;
  updatePosition: (positionConfiguration: PartialElementPositionType) => void;
  parentContainerRef: RefObject<HTMLDivElement>;
  currentSelectedElement: string;
  updateCurrentSelectedElement: (id: string) => void;
}) => {
  const [_, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Rnd
      style={styles}
      className={` bg-green-200 ${
        currentSelectedElement === element.id
          ? "border-black border-4"
          : "border-2 border-blue-400"
      }`}
      bounds={parentContainerRef.current as Element}
      default={{
        x: element.x,
        y: element.y,
        height: element.height ?? "200px",
        width: element.width ?? "320px",
      }}
      onDragStop={(e, d) => {
        updatePosition({ x: d.x, y: d.y });
        // console.log({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updatePosition({
          width: +ref.style.width.replace("px", ""),
          height: +ref.style.height.replace("px", ""),
          x: position.x,
          y: position.y,
        });
        // console.log({
        //   width: ref.style.width,
        //   height: ref.style.height,
        //   ...position,
        // });
      }}
      onDrag={(event, d) => {
        event.preventDefault();
      }}
      onMouseDown={(event) => {
        event.stopPropagation();
        updateCurrentSelectedElement(element.id);
      }}
      // onMouseUp={() => {
      //   console.log("mouse up");
      // }}
    >
      {element.name}
    </Rnd>
  );
};

export default OverlayElement;
