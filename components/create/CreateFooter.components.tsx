import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useMutation } from '@tanstack/react-query';
import { useCanvas } from '../../contexts/CanvasContext';
import { LoaderSpinnerInline } from '../LoaderSpinnerInline.components';
import { RiCloseFill } from 'react-icons/ri';

export const CreateFooter = () => {
  const [penColorState, setPenColorState] = useState<string>('#000000');
  const [backgroundColorState, setBackgroundColorState] =
    useState<string>('#ffffff');
  const [isPenColorModal, setIsPenColorModal] = useState<boolean>(false);
  const [isBackgroundColorModal, setIsBackgroundColorModal] =
    useState<boolean>(false);

  const { clearCanvas, uploadImage, setColor, setPenWidth } = useCanvas();

  const handlePenWidthChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    const selectedOption = event.currentTarget.value;
    setPenWidth(parseInt(selectedOption, 10));
  };

  const { mutate, isLoading } = useMutation(async () => uploadImage());

  useEffect(() => {
    const handleMouseUp = () => {
      setIsPenColorModal(false);
    };

    setColor(penColorState, false);

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [penColorState]);

  useEffect(() => {
    setColor(backgroundColorState, true);
  }, [backgroundColorState]);

  return (
    <>
      <footer className="fixed bottom-[22px] z-40 flex h-[130px] w-full flex-col bg-opacity-75 backdrop-blur-sm dark:border-b dark:border-b-shadeMedium md:bottom-0 md:ml-[94px] md:flex md:h-[75px] md:pr-[94px] lg:ml-[213px] lg:pr-[213px]">
        {/* Drawings Tools Desktop */}
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-[75px] w-full items-center justify-between border-t border-grayBorder bg-white bg-opacity-75 dark:border-b dark:border-shadeMedium dark:bg-midnight dark:bg-opacity-90 dark:md:border-transparent dark:md:bg-shadeDark">
            {/* Pen Color */}
            <div className="flex h-full w-3/12 items-center justify-center border-r border-grayBorder dark:border-shadeMedium">
              {/* Pen Color Picker Modal */}
              {isPenColorModal ? (
                <div className="absolute mb-[320px] ml-36 flex flex-col items-center justify-center md:mb-[290px] md:ml-0">
                  <div className="-mb-2 flex w-[200px] justify-end rounded-t-md bg-black bg-opacity-50 pb-2 pr-1">
                    <span
                      onClick={() => setIsPenColorModal(false)}
                      className="cursor-pointer text-3xl text-white"
                    >
                      <RiCloseFill />
                    </span>
                  </div>
                  <HexColorPicker
                    color={penColorState}
                    onChange={setPenColorState}
                  />

                  <div className="w-3/12 px-1"></div>
                  <div className="w-2/12 px-1"></div>
                  <div className="w-2/12 px-1"></div>
                  <div className="w-2/12 px-1"></div>
                </div>
              ) : null}
              {/*  */}
              <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
                <span
                  onClick={() => setIsPenColorModal(!isPenColorModal)}
                  className="flex aspect-square h-[47px] w-[91px] cursor-pointer items-center justify-center rounded-xl border border-placeholder dark:border-shadeText lg:aspect-auto"
                >
                  <span
                    className="flex aspect-square h-[31px] w-[74px] items-center justify-center rounded-lg border border-placeholder dark:border-shadeText lg:aspect-auto"
                    style={{ backgroundColor: penColorState }}
                  ></span>
                </span>
                <p className="text-sm font-semibold dark:text-egg md:block lg:hidden">
                  Pen
                </p>
              </div>
            </div>
            {/*  */}
            {/* Pen Width */}
            <div className="flex h-full w-3/12 items-center justify-center border-r border-grayBorder dark:border-shadeMedium">
              <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
                <div className="rounded-lg border border-placeholder py-1 px-2 dark:border-shadeText">
                  <select
                    onChange={handlePenWidthChange}
                    defaultValue="5"
                    className="bg-transparent focus:outline-none dark:text-egg"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="28">28</option>
                    <option value="32">32</option>
                    <option value="36">36</option>
                    <option value="40">40</option>
                    <option value="44">44</option>
                    <option value="48">48</option>
                    <option value="56">56</option>
                    <option value="64">64</option>
                    <option value="80">80</option>
                    <option value="96">96</option>
                    <option value="112">112</option>
                    <option value="128">128</option>
                    <option value="144">144</option>
                    <option value="160">160</option>
                  </select>
                </div>
                <p className="text-sm font-semibold dark:text-egg md:block lg:hidden">
                  Width
                </p>
              </div>
            </div>
            {/*  */}
            {/* Clear Button */}
            <div className="flex h-full w-3/12 items-center justify-center border-r border-grayBorder dark:border-shadeMedium">
              <span
                onClick={clearCanvas}
                className="flex cursor-pointer items-center justify-center rounded-2xl border border-placeholder bg-gradient-to-tr py-3 px-4 font-semibold transition duration-75 ease-in-out hover:animate-button hover:border-transparent hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:bg-[length:400%_400%] hover:text-white dark:border-shadeText dark:text-egg dark:hover:border-transparent md:px-6"
              >
                Clear
              </span>
            </div>
            {/*  */}
            {/* Upload Button */}
            <div className="flex w-3/12 items-center justify-center">
              <button
                onClick={() => mutate()}
                disabled={isLoading ? true : false}
                className={
                  isLoading
                    ? 'rounded-2xl bg-gradient-to-t from-gray-700 to-gray-500 py-3 px-4 font-semibold text-gray-400 md:px-10'
                    : 'rounded-2xl bg-gradient-to-t from-[#5755D3] to-cobalt py-3 px-3 font-semibold text-white transition duration-300 ease-in-out hover:animate-button hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%] dark:hover:border-transparent md:px-6'
                }
              >
                {isLoading ? <LoaderSpinnerInline /> : <>Submit</>}
              </button>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
      </footer>
    </>
  );
};
