import { combineReducers } from 'redux';
import { prd_name_red } from './prd_name_red';

console.log("index")
export const combine_red=combineReducers({
    product_length:prd_name_red,
});