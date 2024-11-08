import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationComponent from "./Components/LocationComponent";
import SearchComponent from "./Components/SearchComponent";
import BandList from "./Components/BandList";

const App = () => {
  const [location, setLocation] = useState(null);
  const [bands, setBands] = useState([]);

  const MUSICBRAINZ_URL = "https://musicbrainz.org/ws/2/artist/";

  useEffect(() => {
    if (location) {
      fetchBands(location);
    }
  }, [location]);

  const fetchBands = async (locationOrCity) => {
    try {
      const query = encodeURIComponent(`${locationOrCity.city}`);
      const res = await axios.get(
        `${MUSICBRAINZ_URL}?query=area:${query} AND type:group AND begin:[${
          new Date().getFullYear()
        } TO *]`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setLocation(locationOrCity);
      setBands(res.data.artists.slice(0, 50)); // limit to 50 bands
    } catch (error) {
      console.error("Error fetching bands:", error);
    }
  };

  return (
    <div>
      <LocationComponent onLocationFetched={setLocation} />
      <SearchComponent onSearch={(city) => fetchBands({ city: city })} />
      <BandList bands={bands} location={location} />
    </div>
  );
};

export default App;
