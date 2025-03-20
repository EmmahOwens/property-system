
import { useEffect, useRef, useState } from "react";
import { NeumorphCard } from "./NeumorphCard";
import { Loader2 } from "lucide-react";

// Temporary access token - in production this should come from environment variables
// or be prompted from the user
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xxMTRwN2lyMDVnMDJxbzhnZ2dpMXMxcyJ9.yAmPcRlkHhfO0xRVzFXctg";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function initializeMap() {
      try {
        // Dynamically import mapboxgl to ensure it only loads in browser
        const mapboxgl = await import('mapbox-gl').then((mod) => mod.default);
        await import('mapbox-gl/dist/mapbox-gl.css');

        if (!mapContainer.current) return;
        
        // Kampala, Uganda coordinates
        const kampalaCoordinates = [32.5825, 0.3476];
      
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
        
        const initializedMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: kampalaCoordinates,
          zoom: 11,
          pitch: 45,
        });
        
        initializedMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add marker for Kampala
        new mapboxgl.Marker({ color: '#1e40af' })
          .setLngLat(kampalaCoordinates)
          .addTo(initializedMap);
        
        initializedMap.on('load', () => {
          setLoading(false);
        });
        
        map.current = initializedMap;
        
        return () => initializedMap.remove();
      } catch (error) {
        console.error("Error loading map:", error);
        setLoading(false);
      }
    }
    
    initializeMap();
  }, []);
  
  return (
    <NeumorphCard className="relative overflow-hidden h-[500px] md:h-[600px]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-2 text-foreground">Loading map...</span>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
    </NeumorphCard>
  );
};

export default MapComponent;
