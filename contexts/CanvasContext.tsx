import { useSession } from 'next-auth/react';
import React, {
  useContext,
  useRef,
  useState,
  MouseEvent,
  TouchEvent,
} from 'react';
import { CreateSuccessModal } from '../components/create/CreateSuccessModal.components';

type CanvasContextValue = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  prepareCanvas: () => void;
  startDrawing: (
    event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => void;
  finishDrawing: () => void;
  setColor: (color: string, isBackground: boolean) => void;
  setPenWidth: (width: number) => void;
  clearCanvas: () => void;
  uploadImage: () => void;
  draw: (
    event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => void;
};

const CanvasContext = React.createContext<CanvasContextValue>(
  {} as CanvasContextValue
);

type CanvasProviderProps = {
  children: React.ReactNode;
};

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const { data: session }: any = useSession();

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

  const startDrawing = (
    event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => {
    let offsetX: number;
    let offsetY: number;
    if (event.type === 'touchstart' && 'touches' in event) {
      offsetX = event.touches[0].pageX;
      offsetY = event.touches[0].pageY;
    } else {
      offsetX = (event as MouseEvent<HTMLCanvasElement>).nativeEvent.offsetX;
      offsetY = (event as MouseEvent<HTMLCanvasElement>).nativeEvent.offsetY;
    }
    contextRef.current!.beginPath();
    contextRef.current!.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (
    event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) {
      return;
    }
    let offsetX: number;
    let offsetY: number;
    if (event.type === 'touchmove' && 'touches' in event) {
      offsetX = event.touches[0].pageX;
      offsetY = event.touches[0].pageY;
    } else {
      offsetX = (event as MouseEvent<HTMLCanvasElement>).nativeEvent.offsetX;
      offsetY = (event as MouseEvent<HTMLCanvasElement>).nativeEvent.offsetY;
    }
    contextRef.current!.lineTo(offsetX, offsetY);
    contextRef.current!.stroke();
  };

  const finishDrawing = () => {
    contextRef.current!.closePath();
    setIsDrawing(false);
  };

  const setColor = (color: string, isBackground: boolean) => {
    const canvas = canvasRef.current!;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    if (isBackground) {
      // Set the global composite operation and fill style
      ctx.fillStyle = color;
      // Fill the entire canvas
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.strokeStyle = color; // Set the stroke style
    }
  };

  const setPenWidth = (width: number) => {
    const canvas = canvasRef.current!;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    ctx.lineWidth = width;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const uploadImage = async () => {
    try {
      const ctx = canvasRef.current!.getContext('2d');
      const dataURL = ctx!.canvas.toDataURL();
      const formData = new FormData();
      formData.append('file', dataURL);
      formData.append('upload_preset', 'Nudoodle');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();

        try {
          const Options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: session?.user.id,
              likes: 0,
              image: data.secure_url,
            }),
          };

          const response = await fetch(`/api/doodles/`, Options);
          const json = await response.json();
          setIsSuccessModal(true);
          return json;
        } catch (error) {
          return error;
        }
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isSuccessModal ? (
        <CreateSuccessModal setIsSuccessModal={setIsSuccessModal} />
      ) : null}
      <CanvasContext.Provider
        value={{
          canvasRef,
          contextRef,
          prepareCanvas,
          startDrawing,
          finishDrawing,
          setColor,
          setPenWidth,
          clearCanvas,
          uploadImage,
          draw,
        }}
      >
        {children}
      </CanvasContext.Provider>
    </>
  );
};

export const useCanvas = () => useContext(CanvasContext);
