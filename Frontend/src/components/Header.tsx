const Header = () => {
  return (
    <>
      <header id="home" className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-40 h-[60px] md:h-[5.55vw] z-50 transition-colors duration-300 bg-sky-50">
        <a className="text-black" href="/">
          <div className="flex items-center">
            <svg
              className="w-[26px] h-[26px] md:w-[2.22vw] md:h-[2.22vw]"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.6 14.3985V14.3993H32V7.19932H24.7969V-0.00146484H17.5969V14.3985H17.6ZM14.4 17.5978H0V24.7978H7.20312L7.20312 32.0001H14.4031L14.4031 17.6001H14.4V17.5978ZM32 17.5978H24.8V24.7978H32V17.5978ZM24.7969 32.0001V24.8001L17.5969 24.8001V32.0001H24.7969Z"
                fill="#101928"
              ></path>
            </svg>
            <span className="ml-[0.55vw] text-[20px] leading-[20px] md:text-[1.94vw] md:leading-[2.22vw] font-geist font-bold">
              Travelio
            </span>
          </div>
        </a>
        <div className="hidden md:flex flex-grow justify-center ml-[10.416vw]">
          <nav className="hidden md:flex">
            <ul className="flex space-x-[2.77vw]">
              <li>
                <a
                  className="text-[1.25vw] leading-[1.94vw] text-[#667185] hover:text-[#5755FF]"
                  href="#home"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="text-[1.25vw] leading-[1.94vw] text-[#667185] hover:text-[#5755FF]"
                  href="#make"
                >
                  MakeTrip
                </a>
              </li>
              <li>
                <a
                  className="text-[1.25vw] leading-[1.94vw] text-[#667185] hover:text-[#5755FF]"
                  href="/ai-agent"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  className="text-[1.25vw] leading-[1.94vw] text-[#667185] hover:text-[#5755FF]"
                  href="/pricing"
                >
                  About Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hidden md:flex items-center ml-[1.66vw] w-[12.638vw] h-[2.22vw]">
          <div className="w-[10.4vw] h-[3.3vw] flex items-center justify-center">
            <button className="font-medium rounded-md sm:rounded-[0.416vw] transition-colors duration-200 text-[#667185] hover:text-[#5755FF]  flex items-center justify-center !p-0">
              <span className="whitespace-nowrap font-manrope text-[1.11vw] font-[500] leading-[1.66vw]">
                Login
              </span>
            </button>
          </div>
          <div className="w-[10.4vw] h-[3.3vw] flex items-center justify-center ml-[1.66vw]">
            <button className="font-medium rounded-md sm:rounded-[0.416vw] transition-colors duration-200 border border-[#D0D5DD] text-[#101928] hover:bg-gray-50  w-[8.05vw] h-[2.22vw] flex items-center justify-center !p-0">
              <span className="whitespace-nowrap font-manrope text-[1.11vw] font-[500] leading-[1.66vw]">
                Contact Us
              </span>
            </button>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button aria-label="Toggle Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-menu text-black"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;