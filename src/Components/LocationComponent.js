import React, { useEffect } from "react";

const LocationComponent = ({ onLocationFetched }) => {
  const GEOJS_URL = "https://get.geojs.io/v1/ip/geo.json";
  const ADD_API = "https://api.opencagedata.com/geocode/v1/";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const current_res = await fetch(
          `${ADD_API}/json?key=cebe19bd465e4362882bb91cefb2d0cc&q=` +
            position.coords.latitude +
            `%2C+` +
            position.coords.longitude +
            `&pretty=1&no_annotations=1`
        );
        const current_location = await current_res.json();
        onLocationFetched({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          city: current_location.results[0].components.city,
        });
      },
      async () => {
        const response = await fetch(GEOJS_URL);
        const data = await response.json();
        onLocationFetched({
          lat: data.latitude,
          lon: data.longitude,
          city: data.city,
        });
      }
    );
  }, [onLocationFetched]);

  return <div>Fetching your location...</div>;
};

export default LocationComponent;
