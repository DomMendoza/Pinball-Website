// /* eslint-disable */
// import React, { useState } from 'react';

// const Header = () => {
//     const [selectedTab, setSelectedTab] = useState('Collections');
//     const [isDropdownOpen, setDropdownOpen] = useState(false);

//     const handleTabClick = (tab) => {
//         setSelectedTab(tab);
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(!isDropdownOpen);
//     };

//     const handleDropdownClick = (tab) => {
//         setSelectedTab(tab);
//         setDropdownOpen(false);
//     };

//     return (
//         <div className="2xl:container 2xl:mx-auto">
//             <div className="block md:hidden w-full mt-5">
//                 <div
//                     onClick={toggleDropdown}
//                     className="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full"
//                 >
//                     <div className="flex space-x-2">
//                         <span id="s1" className="font-semibold text-sm leading-3 hidden">
//                             Selected:
//                         </span>
//                         <p
//                             id="textClicked"
//                             className="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer "
//                         >
//                             {selectedTab}
//                         </p>
//                     </div>
//                     <svg
//                         id="ArrowSVG"
//                         className={`transform ${isDropdownOpen ? 'rotate-180' : ''}`}
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M6 9L12 15L18 9"
//                             stroke="white"
//                             stroke-width="1.5"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                         />
//                     </svg>
//                 </div>
//                 <div className={`relative ${isDropdownOpen ? '' : 'hidden'}`}>
//                     <ul id="list" className="font-normal text-base leading-4 absolute top-2 w-full rounded shadow-md">
//                         <li
//                             onClick={() => handleDropdownClick('Arts')}
//                             className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
//                         >
//                             Arts
//                         </li>
//                         <li
//                             onClick={() => handleDropdownClick('Space')}
//                             className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
//                         >
//                             Space
//                         </li>
//                         <li
//                             onClick={() => handleDropdownClick('Game')}
//                             className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
//                         >
//                             Game
//                         </li>
//                         <li
//                             onClick={() => handleDropdownClick('Utility')}
//                             className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
//                         >
//                             Utility
//                         </li>
//                         <li
//                             onClick={() => handleDropdownClick('Cards')}
//                             className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
//                         >
//                             Cards
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Header;
