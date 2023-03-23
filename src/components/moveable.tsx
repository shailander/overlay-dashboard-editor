import { useEffect, useRef, useState } from "react";
import Moveable, { OnDrag, OnResize, OnRotate, OnScale } from "react-moveable";

function MoveableComponent() {
  const elementRef = useRef<HTMLDivElement>(null);
  const movableContainerIdRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef(null);
  console.log(elementRef.current, "elementRef.current");

  const [_, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={movableContainerIdRef}
      id="movableContainerId"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        ref={elementRef}
        id="movableElementId"
        style={{
          height: "100px",
          width: "100px",
          backgroundColor: "red",
        }}
      >
        NicessHoo
      </div>
      <Moveable
        target={elementRef.current}
        container={null}
        origin={true}
        /* Resize event edges */
        edge={true}
        /* draggable */
        draggable={true}
        throttleDrag={0}
        onDragStart={({ target, clientX, clientY }) => {
          console.log("onDragStart", target);
        }}
        onDrag={({
          target,
          beforeDelta,
          beforeDist,
          left,
          top,
          right,
          bottom,
          delta,
          dist,
          transform,
          clientX,
          clientY,
        }: OnDrag) => {
          console.log("onDrag left, top", left, top);
          // target!.style.left = `${left}px`;
          // target!.style.top = `${top}px`;
          console.log("onDrag translate", dist);
          target!.style.transform = transform;
        }}
        onDragEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onDragEnd", target, isDrag);
        }}
        /* When resize or scale, keeps a ratio of the width, height. */
        keepRatio={false}
        /* resizable*/
        /* Only one of resizable, scalable, warpable can be used. */
        resizable={true}
        throttleResize={0}
        onResizeStart={({ target, clientX, clientY }) => {
          console.log("onResizeStart", target);
        }}
        onResize={({
          target,
          width,
          height,
          dist,
          delta,
          direction,
          clientX,
          clientY,
        }: OnResize) => {
          console.log("onResize", target);
          delta[0] && (target!.style.width = `${width}px`);
          delta[1] && (target!.style.height = `${height}px`);
        }}
        onResizeEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onResizeEnd", target, isDrag);
        }}
        /* scalable */
        /* Only one of resizable, scalable, warpable can be used. */
        scalable={true}
        throttleScale={0}
        onScaleStart={({ target, clientX, clientY }) => {
          console.log("onScaleStart", target);
        }}
        onScale={({
          target,
          scale,
          dist,
          delta,
          transform,
          clientX,
          clientY,
        }: OnScale) => {
          console.log("onScale scale", scale);
          target!.style.transform = transform;
        }}
        onScaleEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onScaleEnd", target, isDrag);
        }}
        /* rotatable */
        rotatable={false}
        throttleRotate={0}
        onRotateStart={({ target, clientX, clientY }) => {
          console.log("onRotateStart", target);
        }}
        onRotate={({
          target,
          delta,
          dist,
          transform,
          clientX,
          clientY,
        }: OnRotate) => {
          console.log("onRotate", dist);
          target!.style.transform = transform;
        }}
        onRotateEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onRotateEnd", target, isDrag);
        }}
        // Enabling pinchable lets you use events that
        // can be used in draggable, resizable, scalable, and rotateable.
        pinchable={true}
        onPinchStart={({ target, clientX, clientY, datas }) => {
          // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
          console.log("onPinchStart");
        }}
        onPinch={({ target, clientX, clientY, datas }) => {
          // pinch event occur before drag, rotate, scale, resize
          console.log("onPinch");
        }}
        onPinchEnd={({ isDrag, target, clientX, clientY, datas }) => {
          // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
          console.log("onPinchEnd");
        }}
      />
    </div>
  );
}

export default MoveableComponent;
