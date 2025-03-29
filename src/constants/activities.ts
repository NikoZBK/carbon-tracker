export interface ActivityCategory {
  id: string;
  name: string;
  icon: string; // SVG path or icon name
  color: string;
}

export interface ActivityType {
  id: string;
  categoryId: string;
  name: string;
  carbonPerUnit: number;
  unit: string;
  description: string;
}

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  {
    id: 'transportation',
    name: 'Transportation',
    icon: 'M8 16c0-2.8 2.2-5 5-5s5 2.2 5 5H8z M18.93 5H5.07C3.926 5 3 5.926 3 7.07v7.86C3 16.074 3.926 17 5.07 17h13.86c1.144 0 2.07-.926 2.07-2.07V7.07C21 5.926 20.074 5 18.93 5z', // Simplified car icon
    color: '#3b82f6', // blue
  },
  {
    id: 'food',
    name: 'Food',
    icon: 'M11 3v4h-4v5a1 1 0 001 1h3v7h2v-7h3a1 1 0 001-1v-5h-4v-4h-2z', // Simplified utensil icon
    color: '#10b981', // green
  },
  {
    id: 'home',
    name: 'Home',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', // Simplified home icon
    color: '#ef4444', // red
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z', // Simplified lightning bolt
    color: '#f59e0b', // amber
  },
  {
    id: 'waste',
    name: 'Waste',
    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', // Simplified trash icon
    color: '#8b5cf6', // purple
  },
];

export const ACTIVITY_TYPES: ActivityType[] = [
  // Transportation - Updated with EPA.gov values
  {
    id: 'car',
    categoryId: 'transportation',
    name: 'Car Travel',
    carbonPerUnit: 0.404, // kg CO2e per mile (based on EPA documentation)
    unit: 'miles',
    description:
      'Distance traveled by car (based on average fuel economy from FHWA)',
  },
  {
    id: 'bus',
    categoryId: 'transportation',
    name: 'Bus Travel',
    carbonPerUnit: 0.105, // kg CO2 per kilometer
    unit: 'km',
    description: 'Distance traveled by bus',
  },
  {
    id: 'train',
    categoryId: 'transportation',
    name: 'Train Travel',
    carbonPerUnit: 0.041, // kg CO2 per kilometer
    unit: 'km',
    description: 'Distance traveled by train',
  },
  {
    id: 'flight',
    categoryId: 'transportation',
    name: 'Flight',
    carbonPerUnit: 0.255, // kg CO2 per kilometer
    unit: 'km',
    description:
      'Distance traveled by plane (avoiding airplane travel is a high-impact action)',
  },

  // Food
  {
    id: 'beef',
    categoryId: 'food',
    name: 'Beef Consumption',
    carbonPerUnit: 27, // kg CO2 per kg
    unit: 'kg',
    description: 'Amount of beef consumed',
  },
  {
    id: 'chicken',
    categoryId: 'food',
    name: 'Chicken Consumption',
    carbonPerUnit: 6.9, // kg CO2 per kg
    unit: 'kg',
    description: 'Amount of chicken consumed',
  },
  {
    id: 'veg_meal',
    categoryId: 'food',
    name: 'Vegetarian Meal',
    carbonPerUnit: 2.5, // kg CO2 per meal
    unit: 'meal',
    description:
      'One vegetarian meal (plant-based diet is a high-impact action)',
  },

  // Home Energy - Updated with EPA.gov values
  {
    id: 'electricity',
    categoryId: 'energy',
    name: 'Electricity Usage',
    carbonPerUnit: 0.455, // kg CO2e per kWh (based on EPA eGRID 2022)
    unit: 'kWh',
    description:
      'Kilowatt-hours of electricity used (typical household: 881 kWh/month)',
  },
  {
    id: 'natural_gas',
    categoryId: 'energy',
    name: 'Natural Gas Usage',
    carbonPerUnit: 0.054, // kg CO2 per cubic foot (0.12 lbs per cubic foot converted to kg)
    unit: 'cubic feet',
    description:
      'Cubic feet of natural gas used (typical household: 4,717 cubic feet/month)',
  },
  {
    id: 'fuel_oil',
    categoryId: 'energy',
    name: 'Fuel Oil Usage',
    carbonPerUnit: 10.19, // kg CO2 per gallon (22.46 lbs per gallon converted to kg)
    unit: 'gallon',
    description:
      'Gallons of fuel oil used (typical household: 42 gallons/month)',
  },
  {
    id: 'propane',
    categoryId: 'energy',
    name: 'Propane Usage',
    carbonPerUnit: 5.75, // kg CO2 per gallon (12.68 lbs per gallon converted to kg)
    unit: 'gallon',
    description:
      'Gallons of propane used (typical household: 32 gallons/month)',
  },

  // Waste - Updated with EPA.gov values
  {
    id: 'landfill',
    categoryId: 'waste',
    name: 'Landfill Waste',
    carbonPerUnit: 0.5, // kg CO2 per kg waste
    unit: 'kg',
    description: 'Weight of waste sent to landfill',
  },
  {
    id: 'recycling_paper',
    categoryId: 'waste',
    name: 'Paper Recycling',
    carbonPerUnit: -0.2, // kg CO2e saved per kg recycled (approximate based on EPA WARM model)
    unit: 'kg',
    description:
      'Weight of paper recycled (avg person generates 0.015 tons/year)',
  },
  {
    id: 'recycling_glass',
    categoryId: 'waste',
    name: 'Glass Recycling',
    carbonPerUnit: -0.15, // kg CO2e saved per kg recycled (approximate based on EPA WARM model)
    unit: 'kg',
    description:
      'Weight of glass recycled (avg person generates 0.029 tons/year)',
  },
  {
    id: 'recycling_plastic',
    categoryId: 'waste',
    name: 'Plastic Recycling',
    carbonPerUnit: -0.25, // kg CO2e saved per kg recycled (approximate based on EPA WARM model)
    unit: 'kg',
    description:
      'Weight of plastic recycled (avg person generates 0.035 tons/year)',
  },
  {
    id: 'recycling_metal',
    categoryId: 'waste',
    name: 'Metal Recycling',
    carbonPerUnit: -0.3, // kg CO2e saved per kg recycled (approximate based on EPA WARM model)
    unit: 'kg',
    description:
      'Weight of metal recycled (avg person generates 0.012 tons/year)',
  },
];
