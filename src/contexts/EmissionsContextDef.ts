import { createContext } from 'react';

export interface EmissionsData {
  country: string;
  year: number;
  totalEmissions: number;
  perCapitaEmissions: number;
}

export interface CountriesData {
  [country: string]: EmissionsData[];
}

export interface EmissionsContextType {
  countryList: string[];
  allCountriesData: CountriesData;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: EmissionsContextType = {
  countryList: [],
  allCountriesData: {},
  loading: true,
  error: null,
  loaded: false,
};

export const EmissionsContext =
  createContext<EmissionsContextType>(initialState);
