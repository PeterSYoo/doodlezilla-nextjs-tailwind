import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useEffect } from 'react';
import { useCanvas } from '../../contexts/CanvasContext';
import { authOptions } from '../api/auth/[...nextauth]';

const CreatePage: React.FC = () => {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <>
      <div className="md:ml-[94px] lg:ml-[213px] bg-zinc-50 flex justify-center h-screen w-screen">
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
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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
