import { icons } from "@/src/config/Icon"
import { IconBuilderInterface } from "../lib/interface"

export default function IconBuilder({ type, paint }: IconBuilderInterface) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox={icons[type]?.viewBox} 
            className={`inline-block fill-current ${paint}`}  
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d={icons[type]?.path}/>
        </svg>
    )
}




