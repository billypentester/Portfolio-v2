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

export interface DataInterface {
    first_name: string;
    last_name: string;
    identity_keyword: string;
    seo: Metadata;
    socialLinks: socialLinksInterface[];
    services: servicesInterface[];
    profile_pic: StaticImageData;
    experience: experienceInterface[];
    projects: projectsInterface[];
    themes: string[];
    expertise: Array<{
        title: string,
        skills: Array<string>
    }>;
    work: Array<{
        title: string,
        image: StaticImageData
    }>;
    edu: Array<{
        id: number,
        title: string,
        university: string,
        startDate: string,
        endDate: string,
        city: string,
        image: StaticImageData
    }>;
    publications: Array<{
        title: string,
        description: string,
        link: string,
        image: StaticImageData,
        tags: Array<string>
    }>;
    cert: Array<{
        title: string,
        image: StaticImageData
    }>;
    clients: Array<{
        id: number,
        name: string,
        image: StaticImageData,
        url: string
    }>;
}