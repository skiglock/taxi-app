import React, { useEffect, useState } from "react";
import MapPicker from "react-google-map-picker";
import { getGoogleMapsAdress } from "../../api/api";
import { ITaxiLocation } from "../../types/taxi";

const defaultLocation = { lat: 55.778279, lng: 37.648376 };
const defaultZoom = 12;

interface IMapsProps {
  onChangeLocation?: ({ latitude, longitude, adress }: ITaxiLocation) => void;
}

const Maps: React.FC<IMapsProps> = ({ onChangeLocation }) => {
  const [zoom, setZoom] = useState(defaultZoom);
  const [defaultMapLocation, setDefaultMapLocation] = useState(defaultLocation);

  const handleChangeLocation = async (latitude: number, longitude: number) => {
    const adress = await getGoogleMapsAdress(latitude, longitude);
    onChangeLocation && onChangeLocation({ latitude, longitude, adress });
    setDefaultMapLocation(defaultLocation);
    setZoom(defaultZoom);
  };

  const handleChangeZoom = (newZoom: number) => {
    setZoom(newZoom);
  };

  return (
    <MapPicker
      defaultLocation={defaultMapLocation}
      zoom={zoom}
      style={{ height: "500px", width: "500px" }}
      onChangeLocation={handleChangeLocation}
      onChangeZoom={handleChangeZoom}
      apiKey={`${process.env.GOOGLE_API_KEY}`}
    />
  );
};

export default Maps;
