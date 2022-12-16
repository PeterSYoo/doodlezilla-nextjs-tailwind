import { useCanvas } from '../../contexts/CanvasContext';
import { HexColorPicker } from 'react-colorful';
import { useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';

export const CreateFooter = () => {
  const [penColorState, setPenColorState] = useState('#000000');
  const [backgroundColorState, setBackgroundColorState] = useState('#ffffff');
  const [isPenColorModal, setIsPenColorModal] = useState<boolean>(false);
  const [isBackgroundColorModal, setIsBackgroundColorModal] =
    useState<boolean>(false);

  const {
    clearCanvas,
    saveImage,
    setPenColor,
    setBackgroundColor,
    setPenWidth,
  } = useCanvas();

  const handlePenWidthChange = (event: any) => {
    event.preventDefault();
    const selectedOption = event.target.value;
    setPenWidth(selectedOption);
  };

  useEffect(() => {
    setPenColor(penColorState);
    setBackgroundColor(backgroundColorState);
    console.log(backgroundColorState);
  }, [penColorState, backgroundColorState]);

  return (
    <>
      <footer className="z-40 fixed bottom-[75px] md:bottom-0 w-full bg-white h-[130px] border-t border-grayBorder backdrop-blur-sm bg-opacity-75 flex md:flex flex-col md:h-[75px] md:ml-[94px] md:pr-[94px] lg:ml-[213px] lg:pr-[213px]">
        {/* Pen Color Picker Modal */}
        {isPenColorModal ? (
          <div className="ml-[20px] bottom-[70px] md:mb-80 md:ml-5 lg:ml-20 fixed md:-bottom-[250px]">
            <div className="flex justify-end bg-black w-full bg-opacity-50 -mb-2 pb-2 rounded-t-md pr-1">
              <span
                onClick={() => setIsPenColorModal(false)}
                className="text-3xl text-white cursor-pointer"
              >
                <RiCloseFill />
              </span>
            </div>
            <HexColorPicker color={penColorState} onChange={setPenColorState} />
          </div>
        ) : null}
        {/*  */}
        {/* Background Color Picker Modal */}
        {isBackgroundColorModal ? (
          <div className="ml-[20px] bottom-[70px] md:mb-80 md:ml-[300px] lg:ml-[380px] fixed md:-bottom-[250px]">
            <div className="flex justify-end bg-black w-full bg-opacity-50 -mb-2 pb-2 rounded-t-md pr-1">
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
        {/* Drawings Tools Desktop */}
        <div className="md:flex w-full justify-center hidden h-full items-center">
          <div className="flex justify-between w-full h-full items-center">
            {/* Pen Color */}
            <div className="flex justify-center w-3/12 border-r border-grayBorder h-full items-center">
              <div className="flex gap-3 items-center">
                <span
                  onClick={() => setIsPenColorModal(true)}
                  className="aspect-square lg:aspect-auto border border-placeholder w-[91px] h-[47px] flex items-center justify-center rounded-xl cursor-pointer"
                >
                  <span
                    className={`aspect-square lg:aspect-auto border border-placeholder w-[74px] h-[31px] flex items-center justify-center rounded-lg bg-[${penColorState}]`}
                  ></span>
                </span>
                <p className="font-semibold text-sm md:block lg:hidden">Pen</p>
                <p className="font-semibold text-sm md:hidden lg:block">
                  Pen Color
                </p>
              </div>
            </div>
            {/*  */}
            {/* Background Color */}
            <div className="flex justify-center w-3/12 border-r border-grayBorder h-full items-center">
              <div className="flex gap-3 items-center">
                <span className="aspect-square lg:aspect-auto border border-placeholder w-[91px] h-[47px] flex items-center justify-center rounded-xl">
                  <span
                    onClick={() => setIsBackgroundColorModal(true)}
                    className="aspect-square lg:aspect-auto border border-placeholder w-[74px] h-[31px] flex items-center justify-center rounded-lg bg-purple-300 cursor-pointer"
                  ></span>
                </span>
                <p className="font-semibold text-sm md:block lg:hidden">BG</p>
                <p className="font-semibold text-sm md:hidden lg:block">
                  Background Color
                </p>
              </div>
            </div>
            {/*  */}
            {/* Pen Width */}
            <div className="flex justify-center w-2/12 border-r border-grayBorder h-full items-center">
              <div className="flex gap-3 items-center">
                <div className="border border-placeholder py-1 px-2 rounded-lg">
                  <select
                    onChange={handlePenWidthChange}
                    className="focus:outline-none bg-transparent"
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
                <p className="font-semibold text-sm md:block lg:hidden">
                  Width
                </p>
                <p className="font-semibold text-sm md:hidden lg:block">
                  Pen Width
                </p>
              </div>
            </div>
            {/*  */}
            {/* Clear Button */}
            <div className="flex justify-center w-2/12 border-r border-grayBorder h-full items-center">
              <span
                onClick={clearCanvas}
                className="border border-placeholder rounded-2xl py-3 px-6 font-semibold cursor-pointer transition duration-75 ease-in-out hover:animate-button hover:bg-[length:400%_400%] bg-gradient-to-tr hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:border-transparent hover:text-white flex justify-center items-center"
              >
                Clear
              </span>
            </div>
            {/*  */}
            {/* Upload Button */}
            <div className="flex justify-center w-2/12 items-center">
              <button
                onClick={saveImage}
                className="bg-gradient-to-t from-[#5755D3] to-cobalt text-white rounded-2xl py-3 px-6 font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3]"
              >
                Upload
              </button>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
        {/* Drawing Tools Mobile 1st Panel */}
        <div className="h-[65px] border-t border-grayBorder w-full md:hidden">
          <div className="flex justify-center w-[375px] mx-auto h-full">
            <div className="border-r border-grayBorder h-full flex items-center w-1/2 justify-center">
              {/* Clear Button */}
              <span className="border border-placeholder text-placeholder rounded-2xl py-3 px-6 font-semibold cursor-pointer">
                Clear
              </span>
              {/*  */}
            </div>
            <div className="flex items-center h-full w-1/2 justify-center">
              {/* Upload Button */}
              <button className="bg-gradient-to-t from-[#5755D3] to-cobalt text-white rounded-2xl py-3 px-6 font-semibold">
                Upload
              </button>
              {/*  */}
            </div>
          </div>
        </div>
        {/*  */}
        {/* Drawing Tools Mobile 2nd Panel */}
        <div className="h-[65px] border-t border-grayBorder w-full md:hidden">
          <div className="flex justify-center w-[375px] mx-auto h-full px-5">
            <div className="border-r border-grayBorder h-full flex items-center w-1/3 justify-start">
              {/* Pen Color */}
              <div className="flex gap-3 items-center">
                <span
                  onClick={() => setIsPenColorModal(true)}
                  className="aspect-square border border-placeholder h-[47px] flex items-center justify-center rounded-xl cursor-pointer"
                >
                  <span className="aspect-square border border-placeholder h-[31px] flex items-center justify-center rounded-lg bg-sunset"></span>
                </span>
                <p className="font-semibold text-sm">Pen</p>
              </div>
              {/*  */}
            </div>
            <div className="h-full flex items-center w-1/3 justify-center">
              {/* Background Color */}
              <div className="flex gap-3 items-center">
                <span className="aspect-square border border-placeholder h-[47px] flex items-center justify-center rounded-xl cursor-pointer">
                  <span className="aspect-square border border-placeholder h-[31px] flex items-center justify-center rounded-lg bg-purple-300"></span>
                </span>
                <p className="font-semibold text-sm">BG</p>
              </div>
              {/*  */}
            </div>
            <div className="border-l border-grayBorder h-full flex items-center w-1/3 justify-end">
              {/* Pen Width */}
              <div className="flex gap-3 items-center">
                <div className="border border-placeholder py-1 px-2 rounded-lg">
                  <select className="focus:outline-none bg-transparent">
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
                <p className="font-semibold text-sm">Size</p>
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
