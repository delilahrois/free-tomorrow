import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const createNewTripAsync = createAsyncThunk(
  'trips/createNewTripAsync',
  async (payload) => {
    const resp = await fetch('https://free-tomorrow-be.herokuapp.com/trips/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip_info: {
          name: payload.name,
          created_by: payload.email,
          budget: payload.budget
        },
        dates: payload.dates
      })
    })
    // });

    if (resp.ok) {
      const newTrip = await resp.json();

      return { newTrip };
    } else {

      // state.error = resp.status
    }
  }
);

export const getAllTripsAsync = createAsyncThunk(
  'trips/getAllTripsAsync',
  async () => {
    const resp = await fetch('https://free-tomorrow-be.herokuapp.com/trips/')
    if (resp.ok) {
      const allTrips = await resp.json()
      console.log(allTrips)
      return { allTrips }
    } else {
      console.log(resp.err)
    }
  },
)

export const getSharedTripAsync = createAsyncThunk(
  'trips/getSharedTripAsync',
  async (payload) => {

    if (payload) {
      const resp = await fetch(`https://free-tomorrow-be.herokuapp.com/trips/${payload}/`)
      if (resp.ok) {
        const sharedTrip = await resp.json()
    
        let stringSharedTrip = JSON.stringify(sharedTrip)
        localStorage.setItem('sharedTrip', stringSharedTrip)
        return { sharedTrip }
      } else {
        console.log(resp.err)
      }
    }
  }
)

export const editSharedTripAsync = createAsyncThunk(
  'trips/editSharedTripAsync',
  async (payload) => {
    // if(payload.budget || payload.dates.length) {
    const resp = await fetch(`https://free-tomorrow-be.herokuapp.com/trips/${payload.tripId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: payload.userId,
        trip_info: {
          budget: payload.budget
        },
        dates: payload.dates
      })
    })
    if (resp.ok) {
      const editedTrip = await resp.json()
      return { editedTrip }
    } else {
      console.log(resp.err)
    }
  }
)

export const getUserTripsAsync = createAsyncThunk(
  'trips/getUserTripsAsync',
  async (payload) => {
    const resp = await fetch(`https://free-tomorrow-be.herokuapp.com/users/${payload}`)
    if(resp.ok) {
      const user = await resp.json()
      const allUserTrips = user.trip_set;
      console.log(allUserTrips, 'all users trips resp')
      return { allUserTrips }
    } else {
      console.log(resp.err)
    }
  }
)


export const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    tempTrip: {
      tripName: null,
      dates: [],
      budget: null
    },
    sharedTrip: {},
    allTrips: null,
    respTripId: []
  },
  reducers: {
    addDates: (state, action) => {
      const newDates = {
        start_date: action.payload.startDate,
        end_date: action.payload.endDate
      }
      state.tempTrip.dates.push(newDates)
    },
    addBudget: (state, action) => {
      state.tempTrip.budget = action.payload;
    },
    addEmails: (state, action) => {
      state.tempTrip.shareEmails = action.payload;
    }
  },
  extraReducers: {
    [createNewTripAsync.fulfilled]: (state, action) => {
      const savedTrip = JSON.stringify(action.payload.newTrip)
      localStorage.setItem('savedTrip', savedTrip)
      state.allTrips = action.payload.newTrip
      state.tempTrip.tripName = savedTrip.name
    },
    [getAllTripsAsync.fulfilled]: (state, action) => {
      state.allTrips = action.payload.allTrips;
    },
    [getSharedTripAsync.fulfilled]: (state, action) => {
      if(action.payload.sharedTrip) {

        state.sharedTrip = action.payload.sharedTrip;
      }
    },
    [editSharedTripAsync.fulfilled]: (state, action) => {

      return action.payload.editedTrip
    },
    [getUserTripsAsync.fulfilled]: (state, action) => {
      state.allTrips = action.payload.allUserTrips;
      // return action.payload.allUserTrips;
    }
  },

})

export const { addDates, addBudget, addEmails } = tripSlice.actions

export default tripSlice.reducer