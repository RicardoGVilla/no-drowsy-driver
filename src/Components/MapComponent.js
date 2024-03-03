import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

// Your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoicnRpZXJyZSIsImEiOiJjbDg2OWM0b3IwOHExM3ZtcWR5MWlyaXpqIn0.CXyX38b-HvC9pt3kHQc_VA";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const directions = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-75.689764, 45.420119], // Ottawa center coordinates
        zoom: 6,
      });

      map.current.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: "metric",
          profile: "mapbox/driving",
        }),
        "top-right"
      );

      // Hardcoded markers and distances of electric chargers from Ottawa
      const markers = [
        {
          lng: -75.6972,
          lat: 45.4215,
          description: "Ottawa Downtown Charging Station",
          distance: "0 km",
        },
        {
          lng: -75.9,
          lat: 44.9,
          description: "Kemptville Supercharger",
          distance: "55 km",
        },
        {
          lng: -76.2,
          lat: 44.3,
          description: "Brockville Quick Charge Hub",
          distance: "115 km",
        },
        {
          lng: -76.5,
          lat: 44.0,
          description: "Kingston EV Power Stop",
          distance: "195 km",
        },
        {
          lng: -76.8,
          lat: 43.9,
          description: "Gananoque Green Charge Point",
          distance: "245 km",
        },
        {
          lng: -77.1,
          lat: 44.0,
          description: "Belleville Battery Boost",
          distance: "295 km",
        },
        {
          lng: -77.4,
          lat: 44.2,
          description: "Trenton Travel Charger",
          distance: "340 km",
        },
        {
          lng: -77.6,
          lat: 44.1,
          description: "Brighton Roadside Recharge",
          distance: "375 km",
        },
        {
          lng: -78.2,
          lat: 44.1,
          description: "Cobourg Connector",
          distance: "415 km",
        },
        {
          lng: -78.9,
          lat: 43.9,
          description: "Oshawa Oasis Charging",
          distance: "470 km",
        },
        {
          lng: -79.4,
          lat: 43.7,
          description: "Toronto Terminal Chargers",
          distance: "500 km",
        },
      ];

      markers.forEach(({ lng, lat, description, distance }) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current);

        const popupContent = `<strong>${description}</strong><br/>Approx. distance from Ottawa: ${distance}`;

        // Create popup but do not add it to the map yet
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeOnClick: false,
        }).setHTML(popupContent);

        // Show popup on mouse enter
        marker.getElement().addEventListener("mouseenter", () => {
          popup.addTo(map.current).setLngLat([lng, lat]);
        });

        // Remove popup on mouse leave
        marker.getElement().addEventListener("mouseleave", () => {
          popup.remove();
        });
      });
    }
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;
