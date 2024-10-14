import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name:"book",
    initialState:{
        items:[]
    },
    reducers:{
        addBooks:(state,action)=>{
            state.items = action.payload;
        },
        removeSingleBook:(state,action)=>{
           state.items = state.items.filter((book)=>book._id != action.id);
        }
    }
})

export const {addBooks,removeSingleBook} = bookSlice.actions;
export default bookSlice.reducer;