import axios from "axios";

export const getAllMyBookings = async () => {
    const res = await axios.get<{ id: string, status: string, from: string, until: string, property: { title: string, location: string, pricePerNight: number, hostId: string, rating: number, isAvailable: boolean }[] }>("http://localhost:8000/api/bookings", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
        },
    });
    console.log(res.data, '==== the result')
    return res.data
}


export const bookProperty = async ({ from, to, propertyId }: {
    from: Date,
    to: Date,
    propertyId: string
}) => {
  return axios.post(
    "http://localhost:8000/api/bookings",
    {
      from,
      to,
      propertyId
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
      },
    }
  );
};



export const rejectBooking = async (id: string) => {
    return axios.put(
        `http://localhost:8000/api/bookings/reject/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
            },
        }
    );
}
export const confirmBooking = async (id: string) => {
    return axios.put(
        `http://localhost:8000/api/bookings/confirm/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
            },
        }
    );
}

