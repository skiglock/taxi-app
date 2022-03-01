import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.API_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});

const googleKey = "AIzaSyD2G06tpFNw9hwoEYdA-SFDxMHClKuNKxs";

export const getGoogleMapsAdress = (latitude: number, longitude: number) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_API_KEY}`
    )
    .then((response) => response.data.results[0].formatted_address);
};
