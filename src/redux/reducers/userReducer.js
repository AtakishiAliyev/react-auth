import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../actions/user'

const initialState = JSON.parse(localStorage.getItem('user')) || null

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getUser.fulfilled]: (_, { payload }) => {
            localStorage.setItem('user', JSON.stringify(payload))
            return { access: payload.access, refresh: payload.refresh };
        },
    },

})

export default userSlice.reducer