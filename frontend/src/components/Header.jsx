// import React, { useRef, useEffect, useState } from 'react';
// import { useAppContext } from '../ContextApi';
// import { Link } from 'react-router-dom';

// const Header = ({ title, children }) => {
//     const { isOpenProfile, setIsOpenProfile, setIsOpen, user } = useAppContext();
//     const [isOpenNotification, setisOpenNotification] = useState(false)
//     const ProfileRef = useRef(null);

//     const toggleDropdown = () => {
//         setIsOpenProfile(!isOpenProfile);
//         setisOpenNotification(false);
//     };

//     const handleCopyUID = () => {
//         const uidText = document.querySelector('.uid-text').textContent;
//         navigator.clipboard.writeText(uidText)
//     };

//     const handleClickOutside = (event) => {
//         if (ProfileRef.current && !ProfileRef.current.contains(event.target)) {
//             setIsOpenProfile(false);
//             setisOpenNotification(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);


//     return (
//         <div ref={ProfileRef} className=' top-0'>
//             <div className="flex items-center justify-between p-4 sm:px-8 bg-white border-b border-[#DEE2E6]">
//                 <button className="md:hidden " onClick={() => { setIsOpen(prev => !prev); setIsOpenProfile(false); }}>
//                     <svg className='w-10' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
//                         <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                     </svg>
//                 </button>

//                 <h1 className=" text-2xl sm:text-3xl text-[#000000] font-semibold">{title}</h1>


//                 <div className="flex items-center sm:space-x-6">


//                     {/* NOTIFICATION CODE */}
//                     <div className="relative">
//                         {/* Notification Icon with Badge */}
//                         <div className="flex items-center space-x-3 cursor-pointer" onClick={() => {setisOpenNotification(!isOpenNotification); setIsOpenProfile(false);}}>
//                             <div className="relative">
//                                 <svg className="w-[30px] text-gray-500 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors"
//                                     viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M9.35442 21C10.0596 21.6224 10.9858 22 12.0002 22C13.0147 22 13.9409 21.6224 14.6461 21M2.29414 5.81989C2.27979 4.36854 3.06227 3.01325 4.32635 2.3M21.7024 5.8199C21.7167 4.36855 20.9342 3.01325 19.6702 2.3M18.0002 8C18.0002 6.4087 17.3681 4.88258 16.2429 3.75736C15.1177 2.63214 13.5915 2 12.0002 2C10.4089 2 8.88283 2.63214 7.75761 3.75736C6.63239 4.88258 6.00025 6.4087 6.00025 8C6.00025 11.0902 5.22072 13.206 4.34991 14.6054C3.61538 15.7859 3.24811 16.3761 3.26157 16.5408C3.27649 16.7231 3.31511 16.7926 3.46203 16.9016C3.59471 17 4.19284 17 5.3891 17H18.6114C19.8077 17 20.4058 17 20.5385 16.9016C20.6854 16.7926 20.724 16.7231 20.7389 16.5408C20.7524 16.3761 20.3851 15.7859 19.6506 14.6054C18.7798 13.206 18.0002 11.0902 18.0002 8Z"
//                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                 </svg>

//                                 {/* Notification Badge */}
//                                 <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
//                             </div>
//                         </div>

//                         {/* Notification Dropdown */}
//                         {isOpenNotification && (
//                             <div className="absolute right-0 z-50 mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
//                                 <div className="p-4 border-b">
//                                     <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
//                                 </div>
//                                 <ul className="divide-y divide-gray-100">
//                                     <li className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
//                                         <p className="text-sm text-gray-600">💳 Payment is pending. Please make the payment first.</p>
//                                     </li>
//                                     <li className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
//                                         <p className="text-sm text-gray-600">⚠️ New update available! Check the settings.</p>
//                                     </li>
//                                 </ul>
//                                 <div className="p-3 text-center border-t">
//                                     <button
                                        
//                                         className="text-sm text-blue-500 hover:underline">
//                                         View All
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* user profile */}
//                     <div className="relative">
                       
//                         {isOpenProfile && (
//                             <div onClick={toggleDropdown} className="absolute right-0 z-2 mt-3 w-64 bg-[#ffffff] border-[2px] border-opacity-15 border-[#000000] rounded-lg shadow-2xl z-50">

//                                 <ul>
//                                     <li className="py-2 px-4 hover:bg-[#e0e0e0] cursor-pointer">
//                                         <svg
//                                             className="w-[15px] inline-block mr-[3px]"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                         >
//                                             <path
//                                                 d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
//                                                 stroke="currentColor"
//                                                 strokeWidth="2"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                         </svg>
//                                         {user.username}
//                                         <p className="text-xs ml-5">
//                                             UID:
//                                             <span className="uid-text text-[#063E50] underline">
//                                                 {user._id}
//                                             </span>
//                                             {/* Copy button */}
//                                             <button
//                                                 className="ml-2 text-sm text-blue-500 underline hover:text-[gray]"
//                                                 onClick={handleCopyUID}
//                                             >
//                                                 <svg className='w-3' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                     <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//                                                 </svg>
//                                             </button>
//                                         </p>
//                                     </li>
//                                     {/* <li className="py-2 px-4 hover:bg-[#e0e0e0] cursor-pointer">
//                                         <svg className='w-[15px] inline-block mr-[3px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <path d="M14.0497 6C15.0264 6.19057 15.924 6.66826 16.6277 7.37194C17.3314 8.07561 17.8091 8.97326 17.9997 9.95M14.0497 2C16.0789 2.22544 17.9713 3.13417 19.4159 4.57701C20.8606 6.01984 21.7717 7.91101 21.9997 9.94M10.2266 13.8631C9.02506 12.6615 8.07627 11.3028 7.38028 9.85323C7.32041 9.72854 7.29048 9.66619 7.26748 9.5873C7.18576 9.30695 7.24446 8.96269 7.41447 8.72526C7.46231 8.65845 7.51947 8.60129 7.63378 8.48698C7.98338 8.13737 8.15819 7.96257 8.27247 7.78679C8.70347 7.1239 8.70347 6.26932 8.27247 5.60643C8.15819 5.43065 7.98338 5.25585 7.63378 4.90624L7.43891 4.71137C6.90747 4.17993 6.64174 3.91421 6.35636 3.76987C5.7888 3.4828 5.11854 3.4828 4.55098 3.76987C4.2656 3.91421 3.99987 4.17993 3.46843 4.71137L3.3108 4.86901C2.78117 5.39863 2.51636 5.66344 2.31411 6.02348C2.08969 6.42298 1.92833 7.04347 1.9297 7.5017C1.93092 7.91464 2.01103 8.19687 2.17124 8.76131C3.03221 11.7947 4.65668 14.6571 7.04466 17.045C9.43264 19.433 12.295 21.0575 15.3284 21.9185C15.8928 22.0787 16.1751 22.1588 16.588 22.16C17.0462 22.1614 17.6667 22 18.0662 21.7756C18.4263 21.5733 18.6911 21.3085 19.2207 20.7789L19.3783 20.6213C19.9098 20.0898 20.1755 19.8241 20.3198 19.5387C20.6069 18.9712 20.6069 18.3009 20.3198 17.7333C20.1755 17.448 19.9098 17.1822 19.3783 16.6508L19.1835 16.4559C18.8339 16.1063 18.6591 15.9315 18.4833 15.8172C17.8204 15.3862 16.9658 15.3862 16.3029 15.8172C16.1271 15.9315 15.9523 16.1063 15.6027 16.4559C15.4884 16.5702 15.4313 16.6274 15.3644 16.6752C15.127 16.8453 14.7828 16.904 14.5024 16.8222C14.4235 16.7992 14.3612 16.7693 14.2365 16.7094C12.7869 16.0134 11.4282 15.0646 10.2266 13.8631Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                         </svg>
//                                         +91 9058310106</li> */}
//                                     <Link to='/' ><li className="py-2 px-4 hover:bg-[#e0e0e0] cursor-pointer">
//                                         <svg className='w-[15px] inline-block mr-[3px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <path d="M3.41345 10.7445C2.81811 10.513 2.52043 10.3972 2.43353 10.2304C2.35819 10.0858 2.35809 9.91354 2.43326 9.76886C2.51997 9.60195 2.8175 9.48584 3.41258 9.25361L20.3003 2.66327C20.8375 2.45364 21.1061 2.34883 21.2777 2.40616C21.4268 2.45596 21.5437 2.57292 21.5935 2.72197C21.6509 2.8936 21.5461 3.16219 21.3364 3.69937L14.7461 20.5871C14.5139 21.1822 14.3977 21.4797 14.2308 21.5664C14.0862 21.6416 13.9139 21.6415 13.7693 21.5662C13.6025 21.4793 13.4867 21.1816 13.2552 20.5862L10.6271 13.8282C10.5801 13.7074 10.5566 13.647 10.5203 13.5961C10.4881 13.551 10.4487 13.5115 10.4036 13.4794C10.3527 13.4431 10.2923 13.4196 10.1715 13.3726L3.41345 10.7445Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                         </svg>
//                                         Go to Dashboard</li></Link>
//                                     <li className="py-2 px-4 hover:bg-[#e0e0e0] cursor-pointer bg-[#eaeaea]">Logged In as {user.email}</li>
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <main >
//                 {children}
//             </main>
//         </div>
//     );
// };

// export default Header;


import React, { useRef, useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';

const Header = ({ title, children }) => {
    const { isOpenProfile, setIsOpenProfile, setIsOpen } = useUser();
    const ProfileRef = useRef(null);
    

        const handleClickOutside = (event) => {
        if (ProfileRef.current && !ProfileRef.current.contains(event.target)) {
            setIsOpenProfile(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div ref={ProfileRef} className=' top-0'>
            <div className="flex md:hidden items-center justify-between p-4 sm:px-8 bg-[#fdfdfd] border-b border-[#DEE2E6]">
                <button
                    className="md:hidden z-50"
                    onClick={() => { setIsOpen(prev => !prev); setIsOpenProfile(false); }}
                    aria-label="Toggle menu"
                >
                    <svg className="w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>

                <h1 className="text-2xl mr-10 sm:text-3xl text-[#515151] font-semibold">{title}</h1>

                <div></div>
            </div>
            <main >
                 {children}
            </main>
        </div>
    );
};

export default Header;
