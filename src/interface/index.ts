interface ServicesInterface {
    services: any
}

interface HeroLinksInterface {
    heroLinks: any,
    profilePic: string,
    first_name: string
}

interface IToast {
    message: string;
    status: string
}

interface Icon {
    path: string;
    viewBox: string;
}

interface IconInterface {
    [key: string]: Icon;
}

interface IIconBuilder {
    type: string
    paint: string
}

interface AppState {
    data: {
        socialLinks: Array<any>
    },
    setData: (data: any) => void
}