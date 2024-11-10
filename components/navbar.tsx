// import Icons from '../utils/Icons';

export default function Navbar() {

  return (

    <nav className="w-full p-5">
        <div className="flex items-center">
            <div className="w-1/5">
                <a href='https://www.linkedin.com/in/billypentester' className="text-xl font-bold text-secondary">billypentester</a>
            </div>
            <div className="flex-1 bg-surface rounded-full shadow-sm">
                <ul className="flex p-1">
                    <li className="nav-link">
                        <a href='#services'>Services</a>
                    </li>
                    <li className="nav-link">
                        <a href='#work'>Work</a>
                    </li>
                    <li className="nav-link">
                        <a href='#experience'>Experience</a>
                    </li>
                    <li className="nav-link">
                        <a href='#expertise'>Expertise</a>
                    </li>
                    <li className="nav-link">
                        <a href='#education'>Education</a>
                    </li>
                    <li className="nav-link">
                        <a href='#contact'>Contact</a>
                    </li>
                </ul>
            </div>
            <div className="w-1/5">
                <div className="flex justify-end">
                    <button className="btn">Resume</button>
                </div>
            </div>
        </div>
    </nav>

    // <nav className="navbar bg-base-100">
    //     <div className="navbar-start">
    //         <div className="dropdown">
    //             <label tabIndex={0} className="btn btn-ghost lg:hidden">
    //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
    //                 </svg>
    //             </label>
    //             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
    //                 <li>
    //                     <a href='#hey'>Hey</a>
    //                 </li>
    //                 <li>
    //                     <a href='#services'>Services</a>
    //                 </li>
    //                 <li>
    //                     <a href='#work'>Work</a>
    //                 </li>
    //                 <li>
    //                     <a href='#experience'>Experience</a>
    //                 </li>
    //                 <li>
    //                     <a href='#publications'>Publications</a>
    //                 </li>
    //                 <li>
    //                     <a href='#expertise'>Expertise</a>
    //                 </li>
    //                 <li>
    //                     <a href='#education'>Education</a>
    //                 </li>
    //                 <li>
    //                     <a href='#contact'>Contact</a>
    //                 </li>
    //             </ul>
    //         </div>
    //         <a className="btn btn-ghost text-secondary normal-case text-xl" href='https://www.linkedin.com/in/billypentester'>billypentester</a>
    //     </div>
    //     <div className="navbar-center hidden lg:flex">
    //         <ul className="menu menu-horizontal px-1">
    //             <li>
    //                 <a href='#hey'>Hey</a>
    //             </li>
    //             <li>
    //                 <a href='#services'>Services</a>
    //             </li>
    //             <li>
    //                 <a href='#work'>Work</a>
    //             </li>
    //             <li>
    //                 <a href='#experience'>Experience</a>
    //             </li>
    //             <li>
    //                 <a href='#publications'>Publications</a>
    //             </li>
    //             <li>
    //                 <a href='#expertise'>Expertise</a>
    //             </li>
    //             <li>
    //                 <a href='#education'>Education</a>
    //             </li>
    //             <li>
    //                 <a href='#contact'>Contact</a>
    //             </li>
    //         </ul>
    //     </div>
    //     <div className="navbar-end">
    //         <a className="btn btn-secondary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
    //             {/* <Icons type='file' paint="h-4 w-4  text-base-100"/> */}
    //             <span className="hidden md:block me-2 text-base-100">Resume</span>
    //         </a>
    //     </div>
    // </nav>
  )
}
