import axios from "axios";

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


export const getMyProperties = async () => {
    const res =  await axios.get<{ data: { id: string, title: string, description: string, pricePerNight: number, location: string, hostId: string, rating: number, isAvailable: boolean }[]}>("http://localhost:8000/api/properties/me", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
        },
    });

    return res.data.data
};


export const getMyProperty = async (id: string) => {
  console.log(id, '===== id __________++++++')
    const res =  await axios.get<{ data: { id: string, title: string, description: string, pricePerNight: number, location: string, hostId: string, rating: number, isAvailable: boolean }}>(`http://localhost:8000/api/properties/me/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
        },
    });

    return res.data.data
}


export const updateProperty = async (id: string, data: { title: string, description: string, pricePerNight: number, location: string }): Promise<void> => {
    await axios.put(
        `http://localhost:8000/api/properties/me/${id}`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
            },
        }
    );
  };

  export const deleteProperty = async (id: string) => {
    return axios.delete(
        `http://localhost:8000/api/properties/me/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
            },
        }
    );
  }


  export const createProperty = async (data: { title: string, description: string, pricePerNight: number, location: string }): Promise<void> => {
    await axios.post(
        "http://localhost:8000/api/properties",
        data,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
            },
        }
    );
  }

  export const getAllProperties = async () => {
    const res =  await axios.get<{ id: string, title: string, description: string, pricePerNight: number, location: string, hostId: string, rating: number, isAvailable: boolean }[]>("http://localhost:8000/api/properties");

    return res.data
  }


  export const getTheirBookings = async () => {
    const res =  await axios.get<{ id: string, status: string, from: string, until: string, property: { title: string, location: string, pricePerNight: number, hostId: string, rating: number, isAvailable: boolean }}[]>("http://localhost:8000/api/bookings/their", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("@Auth:accessToken")}`,
        },
    });

    return res.data
  }
