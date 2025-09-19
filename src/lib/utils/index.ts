export const capitalized = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const yearDifference = (start: string, end: string, currentlyWorking: boolean) : number => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const currentDate = new Date()
    
    let years = currentlyWorking ? currentDate.getFullYear() - startDate.getFullYear() : endDate.getFullYear() - startDate.getFullYear()
    const months = currentlyWorking ? currentDate.getMonth() - startDate.getMonth() : endDate.getMonth() - startDate.getMonth()

    if(months < 0 || (months === 0 && currentDate.getDate() < startDate.getDate())) {
        years--
    }

    return years
}

export const dateFormatter = (date: string) : string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' }
    return new Date(date).toLocaleDateString('en-US', options)
}