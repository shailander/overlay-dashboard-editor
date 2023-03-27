import OverlayDashboard from "@/components/overlay-dashboard/overlayDashboard";
import OverlayElement from "@/components/overlay-element/overlayElement";
import { useEffect, useRef, useState } from "react";

export type ElementPositionType = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export type PartialElementPositionType = Partial<
  Pick<ElementPositionType, "height" | "width">
> &
  Pick<ElementPositionType, "x" | "y">;

export interface ElementInitialType extends ElementPositionType {
  name: string;
  id: string;
  show: boolean;
}

const ElemetsOptions = [
  {
    name: "Chat Box",
    id: "chat_box",
    height: 200,
    width: 320,
    x: 320,
    y: 0,
    show: false,
  },
  {
    name: "Featured Chat",
    id: "featured_chat",
    height: 200,
    width: 320,
    x: 320 * 2,
    y: 0,
    show: false,
  },
  {
    name: "Subscriber Alert",
    id: "subscriber_alert",
    height: 200,
    width: 320,
    x: 320 * 2,
    y: 0,
    show: false,
  },
];

const ScaleToHeight = 1080;
const ScaleToWidth = 1920;

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [elements, setElements] =
    useState<ElementInitialType[]>(ElemetsOptions);

  const [currentSelectedElement, setCurrentSelectedElement] =
    useState<string>("");

  const elementsConfigurations = useRef<{
    [id: string]: ElementPositionType;
  }>({});

  const addElement = (elementId: string) => {
    const selectedElement = elements.find(
      (element) => element.id === elementId
    )!;
    elementsConfigurations.current = {
      ...elementsConfigurations.current,
      [selectedElement.id]: {
        height: selectedElement.height,
        width: selectedElement.width,
        x: selectedElement.x,
        y: selectedElement.y,
      },
    };
    const updatedElementList = elements.map((element) => {
      if (element.id === selectedElement.id) {
        return {
          ...element,
          show: true,
        };
      }
      return element;
    });
    setElements(updatedElementList);
  };

  const removeElement = () => {
    const updatedElementList = elements.map((element) => {
      if (element.id === currentSelectedElement) {
        return {
          ...element,
          show: false,
        };
      }
      return element;
    });
    const elementsConfigurationsUpdated = Object.keys(
      elementsConfigurations.current
    ).reduce((acc, key) => {
      if (key !== currentSelectedElement) {
        acc[key] = elementsConfigurations.current[key];
      }
      return acc;
    }, {} as { [id: string]: ElementPositionType });
    setElements(updatedElementList);
    elementsConfigurations.current = elementsConfigurationsUpdated;
  };

  const updatePosition = (
    id: string,
    positionConfiguration: PartialElementPositionType
  ) => {
    const updatedElementsConfigurations = {
      ...elementsConfigurations.current,
      [id]: {
        ...elementsConfigurations.current[id],
        ...positionConfiguration,
      },
    };
    elementsConfigurations.current = updatedElementsConfigurations;
  };

  const submitElementConfigurations = () => {
    const parentContainerWidth = containerRef.current?.offsetWidth;
    const parentContainerheight = containerRef.current?.offsetHeight;
    const elementsConfigurationsUpdated = Object.keys(
      elementsConfigurations.current
    ).reduce((acc, key) => {
      const element = elementsConfigurations.current[key];
      const x = (element.x / parentContainerWidth!) * ScaleToWidth + "px";
      const y = (element.y / parentContainerheight!) * ScaleToHeight + "px";
      const height =
        ((element.height ? element.height : 0) / parentContainerheight!) *
          ScaleToHeight +
        "px";
      const width =
        ((element.width ? element.width : 0) / parentContainerWidth!) *
          ScaleToWidth +
        "px";
      acc[key] = {
        ...element,
        x,
        y,
        height,
        width,
      };
      return acc;
    }, {} as { [id: string]: { x: string; y: string; height: string; width: string } });
    console.log(
      "SUBMISSION ===============>>>>",
      elementsConfigurationsUpdated
    );
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      setCurrentSelectedElement("");
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <OverlayDashboard
        addElement={addElement}
        onSubmit={submitElementConfigurations}
        onRemove={removeElement}
        elementsList={elements}
      />
      <div ref={containerRef} className="w-full h-fit bg-gray-200 aspect-video">
        {elements.map((element) =>
          element.show ? (
            <OverlayElement
              key={element.id}
              element={element}
              updatePosition={(
                positionConfiguration: PartialElementPositionType
              ) => updatePosition(element.id, positionConfiguration)}
              parentContainerRef={containerRef}
              currentSelectedElement={currentSelectedElement}
              updateCurrentSelectedElement={(id: string) =>
                setCurrentSelectedElement(id)
              }
            />
          ) : null
        )}
      </div>
    </div>
  );
};
export default Index;
