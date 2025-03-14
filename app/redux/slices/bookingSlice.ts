import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api"

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: { pickup: string; dropoff: string }) => {
    const response = await api.post("/bookings", bookingData)
    return response.data
  },
)

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload)
        state.loading = false
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default bookingSlice.reducer

