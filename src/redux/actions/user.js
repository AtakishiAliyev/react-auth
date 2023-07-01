import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUser = createAsyncThunk('user/fetchUser', async (data, { rejectWithValue }) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/customers/login/`, data)
        return result.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})