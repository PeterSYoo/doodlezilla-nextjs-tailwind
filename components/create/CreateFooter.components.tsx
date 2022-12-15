export const CreateFooter = () => {
  return (
    <>
      <footer className="z-40 fixed bottom-[75px] md:bottom-0 w-full bg-white h-[130px] border-t border-grayBorder backdrop-blur-sm bg-opacity-75 flex md:flex flex-col md:h-[75px] md:ml-[94px] md:pr-[94px] lg:ml-[213px] lg:pr-[213px]">
        {/* Drawings Tools Desktop */}
        <div className="md:flex w-full justify-center hidden h-full items-center">
          <div className="flex justify-between w-full h-full items-center">
            {/* Pen Color */}
            <div className="flex justify-center w-3/12 border-r border-grayBorder h-full items-center">
              <div className="flex gap-3 items-center">
                <span className="aspect-square lg:aspect-auto border border-placeholder w-[91px] h-[47px] flex items-center justify-center rounded-xl cursor-pointer">
                  <span className="aspect-square lg:aspect-auto border border-placeholder w-[74px] h-[31px] flex items-center justify-center rounded-lg bg-sunset"></span>
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
                <span className="aspect-square lg:aspect-auto border border-placeholder w-[91px] h-[47px] flex items-center justify-center rounded-xl cursor-pointer">
                  <span className="aspect-square lg:aspect-auto border border-placeholder w-[74px] h-[31px] flex items-center justify-center rounded-lg bg-purple-300"></span>
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
                  <select className="focus:outline-none">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
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
              <span className="border border-placeholder text-placeholder rounded-2xl py-3 px-6 font-semibold cursor-pointer">
                Clear
              </span>
            </div>
            {/*  */}
            {/* Upload Button */}
            <div className="flex justify-center w-2/12 items-center">
              <button className="bg-cobalt text-white rounded-2xl py-3 px-6 font-semibold">
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
              <span className="border border-placeholder text-placeholder rounded-2xl py-3 px-6 font-semibold cursor-pointer">
                Clear
              </span>
            </div>
            <div className="flex items-center h-full w-1/2 justify-center">
              <button className="bg-cobalt text-white rounded-2xl py-3 px-6 font-semibold">
                Upload
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Drawing Tools Mobile 2nd Panel */}
        <div className="h-[65px] border-t border-grayBorder w-full md:hidden">
          <div className="flex justify-center w-[375px] mx-auto h-full px-5">
            <div className="border-r border-grayBorder h-full flex items-center w-1/3 justify-start">
              <div className="flex gap-3 items-center">
                <span className="aspect-square border border-placeholder h-[47px] flex items-center justify-center rounded-xl cursor-pointer">
                  <span className="aspect-square border border-placeholder h-[31px] flex items-center justify-center rounded-lg bg-sunset"></span>
                </span>
                <p className="font-semibold text-sm">Pen</p>
              </div>
            </div>
            <div className="h-full flex items-center w-1/3 justify-center">
              <div className="flex gap-3 items-center">
                <span className="aspect-square border border-placeholder h-[47px] flex items-center justify-center rounded-xl cursor-pointer">
                  <span className="aspect-square border border-placeholder h-[31px] flex items-center justify-center rounded-lg bg-purple-300"></span>
                </span>
                <p className="font-semibold text-sm">BG</p>
              </div>
            </div>
            <div className="border-l border-grayBorder h-full flex items-center w-1/3 justify-end">
              <div className="flex gap-3 items-center">
                <div className="border border-placeholder py-1 px-2 rounded-lg">
                  <select className="focus:outline-none">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <p className="font-semibold text-sm">Size</p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </footer>
    </>
  );
};