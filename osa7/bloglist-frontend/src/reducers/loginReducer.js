import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        username: "",
        password: "",
        user: ""
    },
    reducers: {
        setUser:(state,action) => {
            const user = action.payload
            state.user = user
        },
        setPassword:(state,action) => {
            console.log(action.payload)
            state.password = action.payload
        },
        setUsername:(state,action) => {
            console.log(action.payload)
            state.username = action.payload
        }
    }
})

export default loginSlice.reducer
export const {setUser, setPassword,setUsername} = loginSlice.actions