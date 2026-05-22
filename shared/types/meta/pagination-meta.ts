type TActiveDetails = {
    term: string,
    fields: string[],
}
type TInActiveDetails = {
    reason: string;
    availableFields: string[];
}
export type TPaginationMeta = {
        search: {
            active : boolean;
            details : TActiveDetails | TInActiveDetails
        },
        sorting: {
            by: string,
            order: string
        },
        filters :{
            active: boolean;
            count?: number;
            list?: Record<string,any>;
            message?: string
        },
        timestamp: string
}