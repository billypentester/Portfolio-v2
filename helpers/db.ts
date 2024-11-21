import { useQuery } from "@/config/db";

export async function fetchTheme() {

    try {
        const response = await useQuery("SELECT name FROM theme limit ?", [1]);
        const data: any = (response);
        return data[0].name;
    }
    catch (error) {
        throw new Error("Failed to fetch revenue data.");
    }

}