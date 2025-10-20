import React, { useRef, useEffect, useState } from 'react';
import { majorTowns, countiesGeoJson, constituencyCounts } from '../data/mapdata';

// Declare the global Leaflet variable, as it's loaded from a CDN
declare var L: any;

interface KenyaMapProps {
  showTowns: boolean;
}

const KenyaMap: React.FC<KenyaMapProps> = ({ showTowns }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any | null>(null);
    const townsLayerRef = useRef<any | null>(null);
    const geoJsonLayerRef = useRef<any | null>(null);
    const [info, setInfo] = useState<{name: string, constituencies: number | string} | null>(null);
    const infoControlRef = useRef<any | null>(null);

    // Effect for map initialization
    useEffect(() => {
        if (mapRef.current || !mapContainer.current) return;

        mapRef.current = L.map(mapContainer.current, {
            center: [0.5, 37.9],
            zoom: 6,
            maxBounds: [[-6, 33.5], [5.5, 42.5]],
            minZoom: 6,
            maxZoom: 10,
            zoomControl: false,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
        }).addTo(mapRef.current);
        
        L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
        
        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    const toTitleCase = (str: string) => {
        if (!str) return '';
        return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    };

    // Effect for GeoJSON layer
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const defaultStyle = {
            color: 'rgb(107 114 128)',
            weight: 1,
            fillOpacity: 0.1,
            fillColor: 'rgb(156 163 175)',
        };

        const highlightStyle = {
            weight: 2,
            color: '#2F855A',
            fillColor: '#9AE6B4',
            fillOpacity: 0.6
        };

        geoJsonLayerRef.current = L.geoJSON(countiesGeoJson, {
            style: defaultStyle,
            onEachFeature: (feature: any, layer: any) => {
                layer.on({
                    mouseover: (e: any) => {
                        const layer = e.target;
                        layer.setStyle(highlightStyle);
                        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                            layer.bringToFront();
                        }
                        const countyName = toTitleCase(feature.properties.COUNTY_NAM);
                        setInfo({
                            name: countyName,
                            constituencies: constituencyCounts[countyName] || 'N/A'
                        });
                    },
                    mouseout: (e: any) => {
                        geoJsonLayerRef.current.resetStyle(e.target);
                        setInfo(null);
                    },
                    click: (e: any) => {
                        map.fitBounds(e.target.getBounds());
                    }
                });
            }
        }).addTo(map);

        return () => {
            if (map && geoJsonLayerRef.current) {
                map.removeLayer(geoJsonLayerRef.current);
            }
        };
    }, []);

    // Effect for Info Control
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        if (infoControlRef.current) {
            map.removeControl(infoControlRef.current);
        }

        const infoControl = L.control({ position: 'topright' });

        infoControl.onAdd = function (this: any) {
            this._div = L.DomUtil.create('div', 'p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md');
            this.update();
            return this._div;
        };

        infoControl.update = function (this: any, props?: { name: string, constituencies: number | string }) {
            const innerHTML = `
                <h4 class="font-bold text-gray-800 dark:text-gray-200">${props ? props.name : 'Hover over a county'}</h4>
                ${props ? `
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                        Constituencies: <strong>${props.constituencies}</strong>
                    </div>` : ''
                }`;
            if (this._div) {
                this._div.innerHTML = innerHTML;
            }
        };

        infoControl.addTo(map);
        infoControlRef.current = infoControl;
        infoControl.update();

        return () => {
            if (map && infoControlRef.current) {
                map.removeControl(infoControlRef.current);
                infoControlRef.current = null;
            }
        }
    }, []);

    useEffect(() => {
        if(infoControlRef.current) {
            infoControlRef.current.update(info);
        }
    }, [info]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        if (showTowns && !townsLayerRef.current) {
            const townMarkers = majorTowns.features.map(town => {
                const latLng = town.geometry.coordinates.slice().reverse();
                return L.marker(latLng, {
                    icon: L.divIcon({
                        className: 'town-label-icon',
                        html: `<div><svg class="w-2 h-2" fill="#111827" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg><span>${town.properties.name}</span></div>`
                    })
                });
            });
            townsLayerRef.current = L.layerGroup(townMarkers);
        }

        if (showTowns && townsLayerRef.current && !map.hasLayer(townsLayerRef.current)) {
            map.addLayer(townsLayerRef.current);
        } else if (!showTowns && townsLayerRef.current && map.hasLayer(townsLayerRef.current)) {
            map.removeLayer(townsLayerRef.current);
        }
    }, [showTowns]);
    
    const styleString = `
        .town-label-icon { display: flex; align-items: center; justify-content: center; }
        .town-label-icon span { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; color: #111827; margin-left: 5px; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; white-space: nowrap; }
        .leaflet-control-container .leaflet-top.leaflet-right { padding-top: 10px; padding-right: 10px; }
    `;

    return (
        <>
            <style>{styleString}</style>
            <div ref={mapContainer} className="w-full h-full" />
        </>
    );
};

export default KenyaMap;
