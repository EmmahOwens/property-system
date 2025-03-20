
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1haSIsImEiOiJjbDBkMDgwOGMwNTB5M2pwMnIzN21oY3M2In0.yMqCnRqG-3LYUtpGnRVDpw';

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(32.58);  // Kampala longitude
  const [lat, setLat] = useState(0.32);   // Kampala latitude
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    // Initialize map only once
    if (map.current) return;
    
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat] as [number, number],
        zoom: zoom
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add marker at Kampala
      new mapboxgl.Marker()
        .setLngLat([lng, lat] as [number, number])
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Kampala, Uganda</h3>'))
        .addTo(map.current);
      
      // Update map position when it moves
      map.current.on('move', () => {
        if (map.current) {
          const center = map.current.getCenter();
          setLng(Number(center.lng.toFixed(4)));
          setLat(Number(center.lat.toFixed(4)));
          setZoom(Number(map.current.getZoom().toFixed(2)));
        }
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lng, lat, zoom]);

  return (
    <div className="map-container h-[400px] w-full rounded-lg overflow-hidden neumorph">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default MapComponent;
