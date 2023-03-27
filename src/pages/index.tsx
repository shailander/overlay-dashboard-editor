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
}

const ScaleToHeight = 1080;
const ScaleToWidth = 1920;

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [elements, setElements] = useState<ElementInitialType[] | []>([]);

  const [currentSelectedElement, setCurrentSelectedElement] =
    useState<string>("");

  const elementsConfigurations = useRef<{
    [id: string]: ElementPositionType;
  }>({});

  const addElement = (element: ElementInitialType) => {
    elementsConfigurations.current = {
      ...elementsConfigurations.current,
      [element.id]: {
        height: element.height,
        width: element.width,
        x: element.x,
        y: element.y,
      },
    };
    const elementsList = [...elements, element];
    setElements(elementsList);
  };

  const removeElement = () => {
    const updatedElementList = elements.filter(
      (element) => element.id !== currentSelectedElement
    );
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
      />
      <div ref={containerRef} className="w-full h-fit bg-gray-200 aspect-video">
        {elements.map((element) => (
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
        ))}
      </div>
    </div>
  );
};
export default Index;
