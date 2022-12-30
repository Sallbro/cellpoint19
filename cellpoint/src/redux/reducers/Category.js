import { prd_con } from "../constant/constant";

let initstate = {
    catg: []
};

console.log("Category");
export const Category = (state = initstate, { type, payload }) => {
    switch (type) {
        case prd_con.CATEGORY:
            if (payload !== undefined) {
                // initstate={payload}
                return { catg: payload };
            }
            else {
                return {...state};
            }
        default:
            return state;
    }
}