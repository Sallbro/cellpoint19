
//reducer take 3 argument 
// 1.initial state 
// 2.middleware(optional)
// 3.action it contain a.type and b.payload.we have used object destructuring
// export const prd_name_red=(state,action)=>{
//}

import { prd_con } from "../constant/constant";

const initstate = {
    prd_len: []
};

console.log("reducers1");
export const prd_name_red = (state = initstate, { type, payload }) => {
    switch (type) {
        case prd_con.PRD_COUNT:
            return { prd_len: payload };

        default:
            return state;
    }
}
