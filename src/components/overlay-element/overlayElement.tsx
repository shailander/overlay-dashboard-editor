import useSkipFirstRender from "@/hooks/useSkipFirstRender";
import { ElementInitialType, PartialElementPositionType } from "@/pages";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

const OverlayElement = ({
  element,
  updatePosition,
  parentContainerRef,
  currentSelectedElement,
  updateCurrentSelectedElement,
  screenSize,
}: {
  element: ElementInitialType;
  updatePosition: (positionConfiguration: PartialElementPositionType) => void;
  parentContainerRef: RefObject<HTMLDivElement>;
  currentSelectedElement: string;
  updateCurrentSelectedElement: (id: string) => void;
  screenSize: { height: number; width: number };
}) => {
  const [_, setIsMounted] = useState(false);

  const prevScreenSize = useRef({
    height: screenSize.height,
    width: screenSize.width,
  });

  const [elementPosition, setElementPosition] = useState({
    height: element.height,
    width: element.width,
    x: element.x,
    y: element.y,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useSkipFirstRender(() => {
    setElementPosition({
      height:
        elementPosition.height *
        (screenSize.height / prevScreenSize.current.height),
      width:
        elementPosition.width *
        (screenSize.width / prevScreenSize.current.width),
      x: elementPosition.x * (screenSize.width / prevScreenSize.current.width),
      y:
        elementPosition.y * (screenSize.height / prevScreenSize.current.height),
    });
    prevScreenSize.current = {
      height: screenSize.height,
      width: screenSize.width,
    };
  }, [screenSize]);

  return (
    <Rnd
      className={` bg-green-200 ${
        currentSelectedElement === element.id
          ? "border-black border-4"
          : "border-2 border-blue-400"
      }`}
      bounds={parentContainerRef.current as Element}
      default={{
        x: elementPosition.x,
        y: elementPosition.y,
        height: elementPosition.height,
        width: elementPosition.width,
      }}
      size={{
        height: elementPosition.height,
        width: elementPosition.width,
      }}
      position={{
        x: elementPosition.x,
        y: elementPosition.y,
      }}
      onDragStop={(e, d) => {
        updatePosition({ x: d.x, y: d.y });
        setElementPosition({
          ...elementPosition,
          x: d.x,
          y: d.y,
        });
        // console.log({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updatePosition({
          width: +ref.style.width.replace("px", ""),
          height: +ref.style.height.replace("px", ""),
          x: position.x,
          y: position.y,
        });

        setElementPosition({
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
