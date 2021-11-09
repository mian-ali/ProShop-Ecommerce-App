import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants'
import axios from 'axios'

export const listProduct= () => async (dispatch) =>{
 try {
    dispatch({ type : PRODUCT_LIST_REQUEST })
    
    const {data} = await axios.get('/api/products')
    
    dispatch({ 
        type: PRODUCT_LIST_SUCCESS,
        payload: data
    })

 } catch (error) {
     
    dispatch({
        type : PRODUCT_LIST_FAIL,
        payload : error.response && error.response.data.message 
        ? error.response.data.message : error.message
    })
 }

}