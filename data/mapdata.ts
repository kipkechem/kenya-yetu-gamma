
import { baringo } from './counties/shapes/baringo';

/**
 * Geographical paths for Kenya's 47 counties.
 * Coordinates are in Longitude, Latitude format.
 */

const featureToPath = (coords: number[][][]): string => {
    if (!coords || coords.length === 0) return "";
    const ring = coords[0];
    return "M " + ring.map(p => p.join(",")).join(" L ") + " Z";
};

export const countyPaths = [
  {
    "name": "Mombasa",
    "path": "M39.56 -4.07 L39.58 -4.03 L39.63 -3.98 L39.7 -3.95 L39.73 -4.01 L39.68 -4.07 L39.6 -4.09 Z"
  },
  {
    "name": "Kwale",
    "path": "M39.18 -3.97 L39.3 -4.05 L39.43 -4.2 L39.56 -4.28 L39.59 -4.36 L39.52 -4.45 L39.4 -4.6 L39.2 -4.7 L39.0 -4.65 L38.9 -4.5 L38.8 -4.3 L38.9 -4.1 Z"
  },
  {
    "name": "Kilifi",
    "path": "M39.6 -3.9 L39.8 -3.7 L40.0 -3.5 L40.1 -3.2 L40.1 -3.0 L39.9 -2.9 L39.7 -3.0 L39.5 -3.2 L39.3 -3.4 L39.4 -3.7 Z"
  },
  {
    "name": "Tana River",
    "path": "M38.6 -2.0 L39.0 -1.5 L39.5 -1.1 L40.0 -1.2 L40.3 -1.5 L40.4 -2.0 L40.2 -2.5 L39.8 -2.8 L39.2 -2.7 L38.8 -2.4 Z"
  },
  {
    "name": "Lamu",
    "path": "M40.5 -2.3 L40.7 -2.1 L40.9 -1.9 L41.0 -2.0 L41.1 -2.2 L41.0 -2.4 L40.8 -2.5 L40.6 -2.4 Z"
  },
  {
    "name": "Taita/Taveta",
    "path": "M37.6 -3.0 L38.0 -2.8 L38.5 -3.1 L38.8 -3.4 L38.9 -3.8 L38.5 -4.0 L38.0 -3.9 L37.7 -3.6 L37.5 -3.3 Z"
  },
  {
    "name": "Garissa",
    "path": "M38.8 -1.0 L39.2 -0.5 L39.8 0.0 L40.4 0.5 L40.9 0.2 L40.8 -0.5 L40.4 -1.0 L40.0 -1.5 L39.5 -2.0 L39.0 -1.8 Z"
  },
  {
    "name": "Wajir",
    "path": "M39.3 1.0 L39.6 1.5 L40.0 2.0 L40.5 2.5 L40.4 3.0 L40.0 3.2 L39.5 2.8 L39.2 2.2 L39.0 1.5 L39.2 1.0 Z"
  },
  {
    "name": "Mandera",
    "path": "M40.0 3.0 L40.5 3.3 L41.0 3.8 L41.5 4.0 L41.8 3.8 L41.5 3.2 L41.0 2.8 L40.5 2.5 L40.2 2.8 Z"
  },
  {
    "name": "Marsabit",
    "path": "M36.5 2.0 L37.0 2.5 L37.8 3.0 L38.5 3.5 L39.0 3.2 L38.5 2.5 L38.0 1.8 L37.5 1.5 L37.0 1.8 L36.5 2.0 Z"
  },
  {
    "name": "Isiolo",
    "path": "M37.5 0.5 L38.0 0.8 L38.5 1.0 L39.0 0.8 L38.5 0.3 L38.0 0.2 L37.5 0.3 Z"
  },
  {
    "name": "Meru",
    "path": "M37.2 0.0 L37.5 0.3 L37.9 0.5 L38.2 0.3 L38.0 0.0 L37.6 -0.2 L37.3 -0.1 Z"
  },
  {
    "name": "Tharaka-Nithi",
    "path": "M37.8 -0.3 L38.0 -0.1 L38.2 0.0 L38.1 -0.3 L37.9 -0.5 L37.8 -0.3 Z"
  },
  {
    "name": "Embu",
    "path": "M37.4 -0.7 L37.6 -0.5 L37.8 -0.4 L37.9 -0.6 L37.7 -0.9 L37.5 -0.8 Z"
  },
  {
    "name": "Kitui",
    "path": "M37.8 -1.0 L38.2 -0.8 L38.5 -1.2 L38.8 -1.8 L38.5 -2.2 L38.0 -2.0 L37.8 -1.5 Z"
  },
  {
    "name": "Machakos",
    "path": "M37.0 -1.0 L37.4 -1.0 L37.7 -1.2 L37.8 -1.5 L37.5 -1.8 L37.1 -1.5 L37.0 -1.2 Z"
  },
  {
    "name": "Makueni",
    "path": "M37.5 -1.8 L37.8 -1.6 L38.2 -1.9 L38.4 -2.3 L38.0 -2.7 L37.6 -2.4 L37.5 -2.1 Z"
  },
  {
    "name": "Nyandarua",
    "path": "M36.3 -0.5 L36.5 -0.3 L36.7 -0.1 L36.5 0.2 L36.3 0.0 L36.2 -0.4 Z"
  },
  {
    "name": "Nyeri",
    "path": "M36.8 -0.6 L37.0 -0.4 L37.2 -0.3 L37.1 -0.1 L36.9 -0.2 L36.7 -0.4 Z"
  },
  {
    "name": "Kirinyaga",
    "path": "M37.2 -0.7 L37.4 -0.5 L37.5 -0.6 L37.4 -0.8 L37.2 -0.8 Z"
  },
  {
    "name": "Murang'a",
    "path": "M36.9 -1.0 L37.1 -0.8 L37.3 -0.9 L37.2 -1.1 L37.0 -1.1 Z"
  },
  {
    "name": "Kiambu",
    "path": "M36.6 -1.2 L36.8 -1.0 L37.0 -1.1 L37.1 -1.3 L36.8 -1.4 L36.6 -1.2 Z"
  },
  {
    "name": "Turkana",
    "path": "M34.5 3.0 L35.0 3.5 L35.8 4.2 L36.2 4.5 L36.0 5.0 L35.5 4.5 L34.8 4.0 L34.2 3.5 L34.5 3.0 Z"
  },
  {
    "name": "West Pokot",
    "path": "M34.8 1.5 L35.2 1.8 L35.5 2.2 L35.2 2.5 L34.8 2.2 L34.5 1.8 Z"
  },
  {
    "name": "Samburu",
    "path": "M36.5 1.0 L37.0 1.5 L37.5 1.8 L37.2 2.2 L36.8 1.8 L36.2 1.2 Z"
  },
  {
    "name": "Trans Nzoia",
    "path": "M34.8 1.0 L35.0 1.2 L35.2 1.1 L35.0 0.9 L34.8 1.0 Z"
  },
  {
    "name": "Uasin Gishu",
    "path": "M35.0 0.5 L35.3 0.8 L35.6 0.7 L35.5 0.4 L35.2 0.3 Z"
  },
  {
    "name": "Elgeyo/Marakwet",
    "path": "M35.4 0.5 L35.6 1.0 L35.8 1.2 L35.5 0.8 Z"
  },
  {
    "name": "Nandi",
    "path": "M34.8 0.0 L35.2 0.3 L35.5 0.1 L35.2 -0.2 L34.9 -0.1 Z"
  },
  {
    "name": "Baringo",
    "path": featureToPath(baringo.geometry.coordinates)
  },
  {
    "name": "Laikipia",
    "path": "M36.5 0.0 L36.8 0.5 L37.2 0.8 L37.0 0.2 L36.6 0.0 Z"
  },
  {
    "name": "Nakuru",
    "path": "M35.8 -0.5 L36.2 0.0 L36.5 -0.3 L36.2 -0.8 L35.8 -0.5 Z"
  },
  {
    "name": "Narok",
    "path": "M34.8 -1.5 L35.5 -1.0 L36.0 -1.2 L36.2 -1.8 L35.5 -2.0 L34.8 -1.5 Z"
  },
  {
    "name": "Kajiado",
    "path": "M36.2 -2.0 L36.8 -1.5 L37.2 -1.8 L37.5 -2.5 L36.8 -2.8 L36.2 -2.5 Z"
  },
  {
    "name": "Kericho",
    "path": "M35.0 -0.5 L35.3 -0.2 L35.5 -0.4 L35.2 -0.7 L35.0 -0.5 Z"
  },
  {
    "name": "Bomet",
    "path": "M35.0 -1.0 L35.3 -0.7 L35.5 -0.9 L35.2 -1.2 L35.0 -1.0 Z"
  },
  {
    "name": "Kakamega",
    "path": "M34.5 0.3 L34.8 0.6 L35.0 0.4 L34.7 0.1 L34.5 0.3 Z"
  },
  {
    "name": "Vihiga",
    "path": "M34.6 0.0 L34.8 0.2 L34.9 0.1 L34.7 -0.1 Z"
  },
  {
    "name": "Bungoma",
    "path": "M34.3 0.7 L34.6 1.0 L34.8 0.9 L34.5 0.6 Z"
  },
  {
    "name": "Busia",
    "path": "M34.0 0.2 L34.3 0.5 L34.5 0.3 L34.2 0.0 Z"
  },
  {
    "name": "Siaya",
    "path": "M34.0 -0.2 L34.3 0.1 L34.5 -0.1 L34.2 -0.4 Z"
  },
  {
    "name": "Kisumu",
    "path": "M34.5 -0.3 L34.8 -0.1 L35.0 -0.3 L34.7 -0.6 Z"
  },
  {
    "name": "Homa Bay",
    "path": "M34.2 -0.8 L34.5 -0.5 L34.8 -0.7 L34.5 -1.0 Z"
  },
  {
    "name": "Migori",
    "path": "M34.0 -1.2 L34.5 -0.9 L34.8 -1.1 L34.2 -1.4 Z"
  },
  {
    "name": "Kisii",
    "path": "M34.7 -0.9 L34.9 -0.6 L35.0 -0.8 L34.8 -1.0 Z"
  },
  {
    "name": "Nyamira",
    "path": "M34.8 -0.6 L35.0 -0.4 L35.1 -0.6 L34.9 -0.8 Z"
  },
  {
    "name": "Nairobi City",
    "path": "M36.7 -1.2 L36.9 -1.1 L37.0 -1.3 L36.8 -1.4 Z"
  }
];
