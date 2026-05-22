export const getAllKeys = (schema: any, pre = '') => 
    Object.entries(schema.paths).flatMap(([k, v]) => {
        const full = pre ? `${pre}.${k}` : k;
        // @ts-ignore
        const nested = v.schema ? getAllKeys(v.schema, k) : [];
        return [full, ...nested];
});
