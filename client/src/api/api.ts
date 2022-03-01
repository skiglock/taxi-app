import axios from "axios";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-type": "application/json",
  },
});

const googleKey = "AIzaSyD2G06tpFNw9hwoEYdA-SFDxMHClKuNKxs";

export const getGoogleMapsAdress = (latitude: number, longitude: number) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleKey}`
    )
    .then((response) => response.data);
};
