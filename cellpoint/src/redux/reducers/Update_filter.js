import { prd_con } from "../constant/constant";

let initstate = {
    filtered_prd: []
};

console.log("reducers1");
export const Update_filter = (state = initstate, { type, payload }) => {
    switch (type) {
        case prd_con.UPDATEFITER:
            if (payload !== undefined) {
                // initstate={payload}
                return { filtered_prd: payload };
            }
            else {
                return {...state};
            }
        default:
            return state;
    }
}