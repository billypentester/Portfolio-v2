import { Metadata } from "next";
import { StaticImageData } from "next/image";

export interface ToastInterface {
    message: string;
    status: string
}

interface Icon {
    path: string;
    viewBox: string;
}

export interface IconListInterface {
    [key: string]: Icon;
}

export interface IconBuilderInterface {
    type: string
    paint: string
}

export interface socialLinksInterface {
    name: string;
    url: string;
}

export interface servicesInterface {
    title: string;
    description: string;
    icon: string;
}

export interface experienceInterface {
    id: string,
    title: string,
    company: string,
    location: string,
    startTime: string,
    endTime: string,
    currentlyWorking: boolean,
    logo: StaticImageData,
    url: string
}

export interface projectsInterface {
    title: string;
    description: string;
    tags: Array<string>;
    image: StaticImageData;
    url: string;
}

export interface clientInterface {
    id: number,
    name: string,
    image: StaticImageData,
    url: string
}

export interface educationInterface {
    id: number,
    title: string,
    university: string,
    startDate: string,
    endDate: string,
    city: string,
    image: StaticImageData
}

export interface certificationInterface {
    title: string,
    image: StaticImageData,
    showcase?: boolean
}

export interface expertiseInterface {
    title: string,
    skills: Array<string>
}

export interface workInterface {
    title: string,
    image: StaticImageData
}

export interface DataInterface {
    first_name: string;
    last_name: string;
    identity_keyword: string;
    active_theme: string;
    seo: Metadata;
    socialLinks: socialLinksInterface[];
    services: servicesInterface[];
    profile_pic: StaticImageData;
    experience: experienceInterface[];
    projects: projectsInterface[];
    themes: string[];
    expertise: expertiseInterface[];
    work: workInterface[];
    edu: educationInterface[];
    publications: Array<{
        title: string,
        description: string,
        link: string,
        image: StaticImageData,
        tags: Array<string>
    }>;
    cert: certificationInterface[];
    clients?: clientInterface[];
}

export interface structuredDataInterface {
    profileSchema: object;
    aboutSchema?: object;
    websiteSchema?: object;
    aboutMebreadcrumbSchema: object;
    projectBreadcrumbSchema: object;
    blogBreadcrumbSchema: object;
    certificationsBreadcrumbSchema: object;
}

export interface dialogboxInterface {
    show: boolean;
    content: {
        title: string;
        description: string;
    }
}

export interface modalInterface { 
    show: boolean, 
    content: { title: string, description: string }, 
    handleShow: (value: boolean) => void 
}
