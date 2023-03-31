import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useCanvas } from '../../contexts/CanvasContext';
import { getSession } from 'next-auth/react';

const CreatePage = () => {
  // States ------------------------------------------------------------- ***
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } =
    useCanvas();

  // Effects ------------------------------------------------------------- ***
  useEffect(() => {
    prepareCanvas();
  }, []);

  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <canvas
        id="drawing-canvas"
        onMouseDown={(event) => startDrawing(event)}
        onMouseUp={() => finishDrawing()}
        onMouseMove={(event) => draw(event)}
        onTouchStart={(event) => startDrawing(event)}
        onTouchEnd={() => finishDrawing()}
        onTouchMove={(event) => draw(event)}
        onTouchCancel={() => finishDrawing()}
        ref={canvasRef}
        className="bg-gray-300 dark:bg-shadeDark mx-auto"
      />
    </>
  );
};

export default CreatePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // States ------------------------------------------------------------- ***
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};
