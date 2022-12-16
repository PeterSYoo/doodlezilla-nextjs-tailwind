import { useEffect, useRef, useState } from 'react';
import { useCanvas } from '../../contexts/CanvasContext';

const CreatePage: React.FC = () => {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw }: any =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <>
      <div className="md:ml-[94px] lg:ml-[213px] flex-grow flex flex-col justify-center items-center gap-5 md:justify-start">
        <div className="flex justify-center items-center h-screen">
          <canvas
            id="drawing-canvas"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={draw}
            ref={canvasRef}
            className="h-screen w-screen bg-zinc-400"
          />
        </div>
      </div>
    </>
  );
};

export default CreatePage;
