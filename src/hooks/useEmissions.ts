import { useContext } from 'react';
import { EmissionsContext } from '../contexts/EmissionsContextDef';

export function useEmissions() {
  const context = useContext(EmissionsContext);
  if (!context) {
    throw new Error('useEmissions must be used within an EmissionsProvider');
  }
  return context;
}
