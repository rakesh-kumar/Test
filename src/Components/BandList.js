import React from "react";

const BandList = ({ bands, location }) => {
  if (!bands || bands.length === 0) {
    return <p>No bands available in Your City: {location?.city}</p>;
  }
  return (
    <ul>
      <h2>Bands in {location?.city || "your area"}({bands.length})</h2>
      {bands.map((band) => (
        <li key={band.id}>
          {band.name} - Founded: {band["life-span"].begin}
        </li>
      ))}
    </ul>
  );
};

export default BandList;
