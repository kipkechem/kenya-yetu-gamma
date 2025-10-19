import React, { useRef, useEffect, useState } from 'react';
import { countiesGeoJson, majorTowns, constituencyCounts } from '../data/mapdata';

// Declare the global maplibregl variable to satisfy TypeScript
declare var maplibregl: any;

interface KenyaMapProps {
  onCountySelect: (county: { name: string, constituencyCount: number } | null) => void;
  selectedCountyName: string | null;
  showTowns: boolean;
}

const KenyaMap: React.FC<KenyaMapProps> = ({ onCountySelect, selectedCountyName, showTowns }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any | null>(null);
  const [hoveredCountyId, setHoveredCountyId] = useState<string | number | null>(null);
  const isInitialLoad = useRef(true);

  // GeoJSON for a polygon covering the world except for a hole over Kenya
  const maskGeoJson = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        // Exterior ring covers the whole world
        [[-180, 90], [180, 90], [180, -90], [-180, -90], [-180, 90]],
        // Interior ring (hole) for Kenya's bounding box
        [[33, -5], [42, -5], [42, 5], [33, 5], [33, -5]],
      ],
    },
  };

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
            'background-source': {
                type: 'geojson',
                data: null
            }
        },
        layers: [
            {
                id: 'background',
                type: 'background',
                paint: { 'background-color': '#F5F5F5' }
            }
        ]
      },
      center: [37.9, 0.5],
      zoom: 5,
      minZoom: 4,
      maxZoom: 9,
      dragRotate: false, // Disable rotation
      pitchWithRotate: false,
    });
    
    // Set map bounds to roughly Kenya
    map.current.setMaxBounds([[33, -5], [42.5, 5.5]]);

    map.current.on('load', () => {
      const currentMap = map.current;
      if (!currentMap) return;

      // Source for the grey-out mask
      currentMap.addSource('world-mask', {
        type: 'geojson',
        data: maskGeoJson as any
      });

      // Source for counties
      currentMap.addSource('counties', {
        type: 'geojson',
        data: countiesGeoJson as any,
        generateId: true,
      });

      // Source for towns
      currentMap.addSource('towns', {
          type: 'geojson',
          data: majorTowns as any
      });
      
      // Layer to grey out everything outside Kenya
      currentMap.addLayer({
        id: 'world-mask-layer',
        type: 'fill',
        source: 'world-mask',
        paint: {
          'fill-color': '#000000',
          'fill-opacity': 0.15
        }
      });

      // Layer for county fills
      currentMap.addLayer({
        id: 'counties-fill',
        type: 'fill',
        source: 'counties',
        paint: {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'selected'], false], '#10B981', // Selected color: green-500
            ['boolean', ['feature-state', 'hover'], false], '#E5E7EB',    // Hover color: gray-200
            '#FFFFFF',                                                    // Default color: white
          ],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'selected'], false], 0.3,
            0.8
          ],
          'fill-outline-color': '#A9A9A9',
        },
      });

      // Layer for county borders
      currentMap.addLayer({
        id: 'counties-borders',
        type: 'line',
        source: 'counties',
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 1,
        },
      });

      // Layer for county labels
      currentMap.addLayer({
        id: 'county-labels',
        type: 'symbol',
        source: 'counties',
        layout: {
            'text-field': ['get', 'county_nam'],
            'text-size': 10,
            'text-font': ['Inter Regular'],
        },
        paint: {
            'text-color': '#374151', // gray-700
            'text-halo-color': 'rgba(255, 255, 255, 0.8)',
            'text-halo-width': 1,
        }
      });

      // Layer for towns
      currentMap.addLayer({
        id: 'town-labels',
        type: 'symbol',
        source: 'towns',
        layout: {
            'text-field': ['get', 'name'],
            'text-size': 12,
            'text-font': ['Inter SemiBold'],
            'icon-image': 'circle-11',
            'icon-allow-overlap': true,
            'text-allow-overlap': true,
        },
        paint: {
            'text-color': '#111827', // gray-900
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
        }
      });

      // Interactivity
      currentMap.on('click', 'counties-fill', (e: any) => {
        if (e.features && e.features.length > 0) {
          const countyName = e.features[0].properties.county_nam;
          const count = constituencyCounts[countyName] || 0;
          onCountySelect({ name: countyName, constituencyCount: count });
        }
      });
      
      currentMap.on('mousemove', 'counties-fill', (e: any) => {
        currentMap.getCanvas().style.cursor = 'pointer';
        if (e.features && e.features.length > 0) {
          if (hoveredCountyId !== null) {
            currentMap.setFeatureState({ source: 'counties', id: hoveredCountyId }, { hover: false });
          }
          const newHoveredId = e.features[0].id;
          if (newHoveredId) {
            currentMap.setFeatureState({ source: 'counties', id: newHoveredId }, { hover: true });
            setHoveredCountyId(newHoveredId);
          }
        }
      });

      currentMap.on('mouseleave', 'counties-fill', () => {
        currentMap.getCanvas().style.cursor = '';
        if (hoveredCountyId !== null) {
          currentMap.setFeatureState({ source: 'counties', id: hoveredCountyId }, { hover: false });
        }
        setHoveredCountyId(null);
      });
    });

    return () => map.current?.remove();
  }, []);

  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // Clear previous selection by querying all features with the 'selected' state
    const selectedFeatures = map.current.querySourceFeatures('counties', {
        sourceLayer: 'counties-fill',
        filter: ['==', ['feature-state', 'selected'], true]
    });
    selectedFeatures.forEach((feature: any) => {
        if(feature.id) {
            map.current?.setFeatureState({ source: 'counties', id: feature.id }, { selected: false });
        }
    });

    if (selectedCountyName) {
        const features = map.current.querySourceFeatures('counties', {
            filter: ['==', 'county_nam', selectedCountyName]
        });

        if (features.length > 0 && features[0].id) {
            const selectedId = features[0].id;
            map.current.setFeatureState({ source: 'counties', id: selectedId }, { selected: true });
            
            // Calculate bounding box and fly to it
             const coordinates = (features[0].geometry as any).coordinates[0][0];
             const bounds = coordinates.reduce((bounds: any, coord: any) => {
                 return bounds.extend(coord);
             }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));

            map.current.fitBounds(bounds, {
                padding: 40,
                duration: 1000,
                essential: true,
            });
        }
    } else if (!isInitialLoad.current) {
        // If nothing is selected, fly back to the default view
        map.current.flyTo({ center: [37.9, 0.5], zoom: 5 });
    }
    isInitialLoad.current = false;

  }, [selectedCountyName]);

  useEffect(() => {
    if (!map.current || !map.current.getLayer('town-labels')) return;
    map.current.setLayoutProperty('town-labels', 'visibility', showTowns ? 'visible' : 'none');
  }, [showTowns]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default KenyaMap;