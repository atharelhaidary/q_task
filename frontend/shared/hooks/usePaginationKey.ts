import { usePathname } from "next/navigation";

export const usePaginationKey = () => {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean);

    const relevantSegments = segments[0] === "admin-dashboard" ? segments.slice(1) : segments;
    
    const paginationKey = relevantSegments.join("_");
    
    
    return paginationKey
};