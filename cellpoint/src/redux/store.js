// inorder to call the state of redux store we use "useSelector"
// import { useSelector } from 'react-redux';
// const prd = useSelector((state) => state);
// console.log("prd ", prd);

import { configureStore } from '@reduxjs/toolkit';
import { Category } from './reducers/Category';
import { prd_name_red } from './reducers/prd_name_red';
import { Update_filter } from './reducers/Update_filter';
console.log("store");
// console.log("store ",combine_red);
export const Store = configureStore({
    reducer: {
        product_length: prd_name_red,
        filters_product: Update_filter,
        catg: Category
    }
});