import OverlayDashboard from "@/components/overlay-dashboard/overlayDashboard";
import OverlayElement from "@/components/overlay-element/overlayElement";
import { useEffect, useRef, useState } from "react";

export type ElementPositionType = {
  x: number;
  y: number;
  height?: string;
  width?: string;
};

export interface ElementInitialType extends ElementPositionType {
  name: string;
  id: string;
}

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [elements, setElements] = useState<ElementInitialType[] | []>([]);

  const [currentSelectedElement, setCurrentSelectedElement] =
    useState<string>("");

  const elementsConfigurations = useRef<{
    [id: string]: ElementPositionType;
  }>({});

  const addElement = (name: string) => {
    const id = name.replaceAll(" ", "_").toLowerCase();
    const elementInfo = {
      name,
      id,
      height: "200px",
      width: "320px",
      x: elements.length * 320,
      y: 0,
    };
    elementsConfigurations.current = {
      ...elementsConfigurations.current,
      [id]: {
        height: "200px",
        width: "320px",
        x: elements.length * 100,
        y: 0,
      },
    };
    const elementsList = [...elements, elementInfo];
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
    positionConfiguration: ElementPositionType
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
    console.log(
      "SUBMISSION ===============>>>>",
      elementsConfigurations.current
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
      <div ref={containerRef} className="flex-1 h-full bg-gray-200">
        {elements.map((element) => (
          <OverlayElement
            key={element.id}
            element={element}
            updatePosition={(positionConfiguration: ElementPositionType) =>
              updatePosition(element.id, positionConfiguration)
            }
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
