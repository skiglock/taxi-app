import axios from "axios";

const NODE_ENV = process.env.NODE_ENV;
const API_DEV_URL = `${process.env.API_DEV_URL}`;
const API_PROD_URL = `${process.env.API_PROD_URL}`;

const isDevAPI = NODE_ENV === "development";
const isProdAPI = NODE_ENV === "production";

const setBaseURL = () => {
  if (isDevAPI) {
    return API_DEV_URL;
  }
  if (isProdAPI) {
    return API_PROD_URL;
  }
};

export const instance = axios.create({
  baseURL: setBaseURL(),
  headers: {
    "Content-type": "application/json",
  },
});

export const getGoogleMapsAdress = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_API_KEY}`
    )
    .then((response) => response.data.results[0].formatted_address);
};
