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
    setColor(penColorState, false);
  }, [penColorState]);

  useEffect(() => {
    setColor(backgroundColorState, true);
  }, [backgroundColorState]);

  return (
    <>
      <footer className="z-40 fixed bottom-[75px] md:bottom-0 w-full h-[130px] backdrop-blur-sm bg-opacity-75 flex md:flex flex-col md:h-[75px] md:ml-[94px] md:pr-[94px] lg:ml-[213px] lg:pr-[213px]">
        {/* Drawings Tools Desktop */}
        <div className="md:flex md:flex-col w-full justify-center hidden h-full items-center">
          <div className="flex justify-between w-full h-[75px] items-center bg-opacity-75 bg-white dark:bg-midnight dark:md:bg-shadeDark border-t border-grayBorder dark:border-transparent">
            {/* Pen Color */}
            <div className="flex justify-center w-3/12 border-r border-grayBorder dark:border-shadeMedium h-full items-center">
              {/* Pen Color Picker Modal */}
              {isPenColorModal ? (
                <div className="flex flex-col justify-center items-center absolute mb-[290px]">
                  <div className="flex justify-end bg-black w-[200px] bg-opacity-50 -mb-2 pb-2 rounded-t-md pr-1">
                    <span
                      onClick={() => setIsPenColorModal(false)}
                      className="text-3xl text-white cursor-pointer"
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
              <div className="flex gap-3 items-center">
                <span
                  onClick={() => setIsPenColorModal(!isPenColorModal)}
                  className="aspect-square lg:aspect-auto border border-placeholder dark:border-shadeText w-[91px] h-[47px] flex items-center justify-center rounded-xl cursor-pointer"
                >
                  <span
                    className="aspect-square lg:aspect-auto border border-placeholder dark:border-shadeText w-[74px] h-[31px] flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: penColorState }}
                  ></span>
                </span>
                <p className="font-semibold text-sm md:block lg:hidden dark:text-egg">
                  Pen
                </p>
                <p className="font-semibold text-sm md:hidden lg:block dark:text-egg">
                  Pen Color
                </p>
              </div>
            </div>
            {/*  */}
            {/* Background Color */}
            <div className="flex justify-center w-3/12 border-r border-grayBorder dark:border-shadeMedium h-full items-center">
              {/* Background Color Picker Modal */}
              {isBackgroundColorModal ? (
                <div className="flex flex-col justify-center items-center absolute mb-[290px]">
                  <div className="flex justify-end bg-black w-[200px] bg-opacity-50 -mb-2 pb-2 rounded-t-md pr-1">
                    <span
                      onClick={() => setIsBackgroundColorModal(false)}
                      className="text-3xl text-white cursor-pointer"
                    >
                      <RiCloseFill />
                    </span>
                  </div>
                  <HexColorPicker
                    color={backgroundColorState}
                    onChange={setBackgroundColorState}
                  />
                </div>
              ) : null}
              {/*  */}
              <div className="flex gap-3 items-center">
                <span className="aspect-square lg:aspect-auto border border-placeholder dark:border-shadeText w-[91px] h-[47px] flex items-center justify-center rounded-xl">
                  <span
                    onClick={() =>
                      setIsBackgroundColorModal(!isBackgroundColorModal)
                    }
                    className="aspect-square lg:aspect-auto border border-placeholder dark:border-shadeText w-[74px] h-[31px] flex items-center justify-center rounded-lg cursor-pointer"
                    style={{ backgroundColor: backgroundColorState }}
                  ></span>
                </span>
                <p className="font-semibold text-sm md:block lg:hidden dark:text-egg">
                  BG
                </p>
                <p className="font-semibold text-sm md:hidden lg:block dark:text-egg">
                  Background Color
                </p>
              </div>
            </div>
            {/*  */}
            {/* Pen Width */}
            <div className="flex justify-center w-2/12 border-r border-grayBorder dark:border-shadeMedium h-full items-center">
              <div className="flex gap-3 items-center">
                <div className="border border-placeholder dark:border-shadeText py-1 px-2 rounded-lg">
                  <select
                    onChange={handlePenWidthChange}
                    defaultValue="5"
                    className="focus:outline-none bg-transparent dark:text-egg"
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
                <p className="font-semibold text-sm md:block lg:hidden dark:text-egg">
                  Width
                </p>
                <p className="font-semibold text-sm md:hidden lg:block dark:text-egg">
                  Pen Width
                </p>
              </div>
            </div>
            {/*  */}
            {/* Clear Button */}
            <div className="flex justify-center w-2/12 border-r border-grayBorder dark:border-shadeMedium h-full items-center">
              <span
                onClick={clearCanvas}
                className="border border-placeholder rounded-2xl py-3 px-6 font-semibold cursor-pointer transition duration-75 ease-in-out hover:animate-button hover:bg-[length:400%_400%] bg-gradient-to-tr hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:border-transparent hover:text-white flex justify-center items-center dark:text-egg dark:hover:border-transparent dark:border-shadeText"
              >
                Clear
              </span>
            </div>
            {/*  */}
            {/* Upload Button */}
            <div className="flex justify-center w-2/12 items-center">
              <button
                onClick={() => mutate()}
                disabled={isLoading ? true : false}
                className={
                  isLoading
                    ? 'bg-gradient-to-t from-gray-700 to-gray-500 text-gray-400 rounded-2xl py-3 px-10 font-semibold'
                    : 'bg-gradient-to-t from-[#5755D3] to-cobalt text-white rounded-2xl py-3 px-6 font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] dark:hover:border-transparent'
                }
              >
                {isLoading ? <LoaderSpinnerInline /> : <>Submit</>}
              </button>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
        {/* Drawing Tools Mobile 1st Panel */}
        <div className="h-[65px] border-t border-grayBorder dark:border-transparent w-full md:hidden bg-white dark:bg-midnight bg-opacity-75 dark:bg-opacity-75">
          <div className="flex justify-center w-[375px] mx-auto h-full">
            <div className="border-r border-grayBorder dark:border-shadeMedium h-full flex items-center w-1/2 justify-center">
              {/* Clear Button */}
              <span
                onClick={clearCanvas}
                className="border border-placeholder dark:border-shadeText rounded-2xl py-3 px-6 font-semibold cursor-pointer transition duration-75 ease-in-out hover:animate-button hover:bg-[length:400%_400%] bg-gradient-to-tr hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:border-transparent hover:text-white flex justify-center items-center dark:hover:border-transparent dark:text-egg"
              >
                Clear
              </span>
              {/*  */}
            </div>
            <div className="flex items-center h-full w-1/2 justify-center">
              {/* Upload Button */}
              <button
                onClick={() => mutate()}
                disabled={isLoading ? true : false}
                className={
                  isLoading
                    ? 'bg-gradient-to-t from-gray-700 to-gray-500 text-gray-400 rounded-2xl py-3 px-10 font-semibold'
                    : 'bg-gradient-to-t from-[#5755D3] to-cobalt text-white rounded-2xl py-3 px-6 font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] dark:hover:border-transparent'
                }
              >
                {isLoading ? <LoaderSpinnerInline /> : <>Upload</>}
              </button>
              {/*  */}
            </div>
          </div>
        </div>
        {/*  */}
        {/* Drawing Tools Mobile 2nd Panel */}
        <div className="h-[65px] border-t border-grayBorder dark:border-shadeMedium w-full md:hidden bg-white dark:bg-midnight bg-opacity-75 dark:bg-opacity-75">
          <div className="flex justify-center w-[375px] mx-auto h-full px-5">
            <div className="border-r border-grayBorder dark:border-shadeMedium h-full flex items-center w-1/3 justify-start">
              {/* Pen Color Picker Modal */}
              {isPenColorModal ? (
                <div className="flex flex-col justify-center items-center absolute mb-[290px]">
                  <div className="flex justify-end bg-black w-[200px] bg-opacity-50 -mb-2 pb-2 rounded-t-md pr-1">
                    <span
                      onClick={() => setIsPenColorModal(false)}
                      className="text-3xl text-white cursor-pointer"
                    >
                      <RiCloseFill />
                    </span>
                  </div>
                  <HexColorPicker
                    color={penColorState}
                    onChange={setPenColorState}
                  />
                </div>
              ) : null}
              {/*  */}
              {/* Pen Color */}
              <div className="flex gap-3 items-center">
                <span
                  onClick={() => setIsPenColorModal(!isPenColorModal)}
                  className="aspect-square border border-placeholder dark:border-shadeText h-[47px] flex items-center justify-center rounded-xl cursor-pointer"
                >
                  <span
                    className="aspect-square border border-placeholder dark:border-shadeText h-[31px] flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: penColorState }}
                  ></span>
                </span>
                <p className="font-semibold text-sm dark:text-egg">Pen</p>
              </div>
              {/*  */}
            </div>
            <div className="h-full flex items-center w-1/3 justify-center">
              {/* Background Color Picker Modal */}
              {isBackgroundColorModal ? (
                <div className="flex flex-col justify-center items-center absolute mb-[290px] ml-[160px]">
                  <div className="flex justify-end bg-black w-[200px] bg-opacity-50 -mb-2 pb-2 rounded-t-md pr-1">
                    <span
                      onClick={() => setIsBackgroundColorModal(false)}
                      className="text-3xl text-white cursor-pointer"
                    >
                      <RiCloseFill />
                    </span>
                  </div>
                  <HexColorPicker
                    color={backgroundColorState}
                    onChange={setBackgroundColorState}
                  />
                </div>
              ) : null}
              {/*  */}
              {/* Background Color */}
              <div className="flex gap-3 items-center">
                <span
                  onClick={() =>
                    setIsBackgroundColorModal(!isBackgroundColorModal)
                  }
                  className="aspect-square border border-placeholder dark:border-shadeText h-[47px] flex items-center justify-center rounded-xl cursor-pointer"
                >
                  <span
                    className="aspect-square border border-placeholder dark:border-shadeText h-[31px] flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: backgroundColorState }}
                  ></span>
                </span>
                <p className="font-semibold text-sm dark:text-egg">BG</p>
              </div>
              {/*  */}
            </div>
            <div className="border-l border-grayBorder dark:border-shadeMedium h-full flex items-center w-1/3 justify-end">
              {/* Pen Width */}
              <div className="flex gap-3 items-center">
                <div className="border border-placeholder dark:border-shadeText py-1 px-2 rounded-lg">
                  <select
                    onChange={handlePenWidthChange}
                    defaultValue="5"
                    className="focus:outline-none bg-transparent dark:text-egg"
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
                <p className="font-semibold text-sm dark:text-egg">Size</p>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
        {/*  */}
      </footer>
    </>
  );
};
