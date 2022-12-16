import React, {
  useContext,
  useRef,
  useState,
  MouseEvent,
  TouchEvent,
} from 'react';

type CanvasContextValue = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  prepareCanvas: () => void;
  startDrawing: (event: MouseEvent<HTMLCanvasElement>) => void;
  finishDrawing: () => void;
  setPenColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setPenWidth: (width: number) => void;
  clearCanvas: () => void;
  saveImage: () => void;
  draw: (event: MouseEvent<HTMLCanvasElement>) => void;
};

const CanvasContext = React.createContext<CanvasContextValue>(
  {} as CanvasContextValue
);

type CanvasProviderProps = {
  children: React.ReactNode;
};

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d')!;
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = (event: any) => {
    let offsetX: number;
    let offsetY: number;
    if (event.type === 'touchstart' && 'touches' in event) {
      offsetX = event.touches[0].pageX;
      offsetY = event.touches[0].pageY;
    } else {
      offsetX = event.nativeEvent.offsetX;
      offsetY = event.nativeEvent.offsetY;
    }
    contextRef.current!.beginPath();
    contextRef.current!.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event: any) => {
    if (!isDrawing) {
      return;
    }
    let offsetX: number;
    let offsetY: number;
    if (event.type === 'touchmove' && 'touches' in event) {
      offsetX = event.touches[0].pageX;
      offsetY = event.touches[0].pageY;
    } else {
      offsetX = event.nativeEvent.offsetX;
      offsetY = event.nativeEvent.offsetY;
    }
    contextRef.current!.lineTo(offsetX, offsetY);
    contextRef.current!.stroke();
  };

  const finishDrawing = () => {
    contextRef.current!.closePath();
    setIsDrawing(false);
  };

  const setPenColor = (color: string) => {
    const canvas = canvasRef.current!;
    const ctx: any = canvas.getContext('2d');
    ctx.strokeStyle = color;
  };

  const setBackgroundColor = (color: string) => {
    const canvas = canvasRef.current!;
    const ctx: any = canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const setPenWidth = (width: number) => {
    const canvas = canvasRef.current!;
    const ctx: any = canvas.getContext('2d');
    ctx.lineWidth = width;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveImage = () => {
    const ctx = canvasRef.current!.getContext('2d');
    const imageData = ctx!.canvas.toDataURL();
    console.log(imageData);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        setPenColor,
        setBackgroundColor,
        setPenWidth,
        clearCanvas,
        saveImage,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
