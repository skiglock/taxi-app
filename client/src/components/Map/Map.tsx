import React, { useState } from "react";
import MapPicker from "react-google-map-picker";
import { getGoogleMapsAdress } from "../../api/api";
import { ITaxiCoordinates } from "../../types/taxi";

const defaultZoom = 12;

const defaultMapLoScation = {
  lat: 55.778279,
  lng: 37.648376,
};

interface IMapProps {
  width: number;
  height: number;
  onChangeLocation: (
    coordinates: ITaxiCoordinates,
    locationToString: string
  ) => void;
  location: typeof defaultMapLoScation;
}

const Maps: React.FC<IMapProps> = (props) => {
  const { width, height, onChangeLocation, location } = props;
  const [zoom, setZoom] = useState(defaultZoom);
  const [mapError, setMapError] = useState("");

  const handleChangeLocation = async (coordinates: ITaxiCoordinates) => {
    try {
      const locationAdress = await getGoogleMapsAdress(coordinates);
      onChangeLocation(coordinates, locationAdress);
      setZoom(defaultZoom);
    } catch (e) {
      setMapError(`${e}`);
    }
  };

  return (
    <div>
      <span className="error" style={{ textAlign: "center", display: "block" }}>
        {mapError}
      </span>
      <MapPicker
        defaultLocation={
          location.lat && location.lng ? location : defaultMapLoScation
        }
        zoom={zoom}
        style={{ width: `${width}px`, height: `${height}px` }}
        onChangeLocation={(lat, lng) =>
          handleChangeLocation({ latitude: lat, longitude: lng })
        }
        onChangeZoom={(newZoom) => setZoom(newZoom)}
        apiKey={`${process.env.GOOGLE_API_KEY}`}
      />
    </div>
  );
};

export default Maps;
