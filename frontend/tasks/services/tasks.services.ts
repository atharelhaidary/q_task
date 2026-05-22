import { API } from "@/frontend/shared/constants";
import { apiAxios } from "@/frontend/shared/lib";
import { ITask, TApiResponse} from "@/shared/types";
export const tasksServices = {
    createServices : async (data : FormData) : Promise<TApiResponse<ITask>> => {
        const res = await apiAxios.post(API.TASKS.CREATE,data)
        return res.data;
    },
    getAll : async (params)  : Promise<TApiResponse<ITask[]>> => {
        const res = await apiAxios.get(API.TASKS.GET,{params})
        return res.data;
    },
    deleteServices : async (data : FormData) : Promise<TApiResponse> => {
        const res = await apiAxios.post(API.TASKS.DELETE,data)
        return res.data;
    },
    updateServices : async (data : FormData) :   Promise<TApiResponse<ITask>> => {
        const res = await apiAxios.post(API.TASKS.UPDATE,data)
        return res.data;
    },
}