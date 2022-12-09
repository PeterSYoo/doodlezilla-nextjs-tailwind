import { LoaderSpinner } from '../components/LoaderSpinner.components';

export default function Home() {
  return (
    <>
      {false ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className="flex-grow h-full flex items-center justify-center">
            Home Page
          </div>
        </>
      )}
    </>
  );
}
