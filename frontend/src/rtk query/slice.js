import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const plantApi = createApi({
    reducerPath: 'plantApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pronia-finalexam.onrender.com/' }),
    endpoints: (builder) => ({
        getAllPlant: builder.query({
            query: () => `plant/`,
        }),
        getPlantById: builder.query({
            query: (id) => `plant/${id}`,
        }),
        postPlant: builder.mutation({
            query: (newPlant) => ({
                url: `plant/`,
                method: 'POST',
                body: newPlant,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        deletePlant: builder.mutation({
            query: (id) => ({
                url: `plant/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useDeletePlantMutation, usePostPlantMutation, useGetAllPlantQuery, useGetPlantByIdQuery } = plantApi