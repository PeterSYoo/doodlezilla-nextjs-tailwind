import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useCanvas } from '../../contexts/CanvasContext';
import { getSession } from 'next-auth/react';

const CreatePage = () => {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  useEffect(() => {
    // Get a reference to the canvas element
    const canvas = document.getElementById('drawing-canvas');

    // Prevent scrolling when touching the canvas
    document.body.addEventListener(
      'touchstart',
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      },
      false
    );
    document.body.addEventListener(
      'touchend',
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      },
      false
    );
    document.body.addEventListener(
      'touchmove',
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      },
      false
    );
  }, []);

  return (
    <>
      <div className="flex justify-center overflow-hidden bg-gray-300 md:ml-[94px] lg:ml-[213px]">
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
        />
      </div>
    </>
  );
};

export default CreatePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
