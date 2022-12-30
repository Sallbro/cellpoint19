import { prd_con } from "../constant/constant";
console.log("actions");
export const prd_count=(state)=>{
    return {
        type:prd_con.PRD_COUNT,
        payload:state
    }
}
export const updatefilter=(state)=>{
    return {
        type:prd_con.UPDATEFITER,
        payload:state
    }
}
export const category=(state)=>{
    return{
        type:prd_con.CATEGORY,
        payload:state
    }
}
