import { useState } from 'react';
import { useActivity } from '../../hooks/useActivity';
import {
  ACTIVITY_CATEGORIES,
  ACTIVITY_TYPES,
} from '../../constants/activities';
import Card from '../ui/Card';
import FormField from '../forms/FormField';
import CarbonFootprintDisplay from '../activities/CarbonFootprintDisplay';

interface ActivityFormProps {
  onSubmit?: () => void;
  className?: string;
}

/**
 * ActivityForm component for logging new activities.
 *
 * This component provides a form interface for users to add new activities to track
 * their carbon footprint. It allows selecting a category, activity type, date,
 * quantity, and optional notes.
 *
 * @param onSubmit - Callback function executed after successful form submission
 * @param className - Additional CSS class name for styling the form container
 */
export default function ActivityForm({
  onSubmit,
  className = '',
}: ActivityFormProps) {
  const { addActivity } = useActivity();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    typeId: '',
    date: new Date().toISOString().substring(0, 10),
    quantity: 1,
    notes: '',
    // Custom activity fields
    customName: '',
    customUnit: '',
    customCarbonPerUnit: 0,
  });

  // Add custom category to the existing categories
  const CUSTOM_CATEGORY = {
    id: 'custom',
    name: 'Custom',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', // Document icon
    color: '#6366f1', // Indigo color
  };

  const allCategories = [...ACTIVITY_CATEGORIES, CUSTOM_CATEGORY];

  const isCustomCategory = selectedCategory === 'custom';

  // Get filtered types for the selected category (for predefined categories)
  const filteredTypes =
    selectedCategory && !isCustomCategory
      ? ACTIVITY_TYPES.filter(type => type.categoryId === selectedCategory)
      : [];

  const selectedType = ACTIVITY_TYPES.find(type => type.id === formData.typeId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newActivity;

    if (isCustomCategory) {
      // Handle custom activity
      if (
        !formData.customName ||
        !formData.customUnit ||
        formData.customCarbonPerUnit <= 0
      ) {
        return; // Don't submit if required fields are missing
      }

      newActivity = {
        typeId: 'custom',
        date: new Date(formData.date).toISOString(),
        quantity: formData.quantity,
        notes: formData.notes,
        isCustom: true,
        customName: formData.customName,
        customUnit: formData.customUnit,
        customCarbonPerUnit: formData.customCarbonPerUnit,
      };
    } else {
      // Handle predefined activity
      if (!formData.typeId) return; // Don't submit if no type selected

      newActivity = {
        typeId: formData.typeId,
        date: new Date(formData.date).toISOString(),
        quantity: formData.quantity,
        notes: formData.notes,
      };
    }

    // Add the activity through the context
    addActivity(newActivity);

    // Reset form
    setFormData({
      typeId: '',
      date: new Date().toISOString().substring(0, 10),
      quantity: 1,
      notes: '',
      customName: '',
      customUnit: '',
      customCarbonPerUnit: 0,
    });
    setSelectedCategory('');

    if (onSubmit) onSubmit();
  };

  const calculateCarbonFootprint = () => {
    if (isCustomCategory) {
      return (formData.customCarbonPerUnit * formData.quantity).toFixed(2);
    } else if (selectedType) {
      return (selectedType.carbonPerUnit * formData.quantity).toFixed(2);
    }
    return '0.00';
  };

  return (
    <Card className={className}>
      <h2 className="text-subtitle mb-4">Add New Activity</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-caption font-medium mb-3">
              Category
            </label>

            <Card className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-6 gap-4 w-full mb-6">
              {allCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-inverse'
                      : 'bg-light3 hover:bg-light4'
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category.id
                        ? category.color
                        : undefined,
                  }}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setFormData({ ...formData, typeId: '' });
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-1"
                  >
                    <path d={category.icon} />
                  </svg>
                  <span className="text-xs">{category.name}</span>
                </button>
              ))}
            </Card>
          </div>

          {selectedCategory && !isCustomCategory && (
            <FormField id="activityType" label="Activity Type">
              <select
                id="activityType"
                className="w-full p-2 border border-light3 rounded-md bg-theme"
                value={formData.typeId}
                onChange={e =>
                  setFormData({ ...formData, typeId: e.target.value })
                }
                required
              >
                <option value="">Select an activity type</option>
                {filteredTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} ({type.carbonPerUnit} kg CO₂ per {type.unit})
                  </option>
                ))}
              </select>
            </FormField>
          )}

          {isCustomCategory && (
            <>
              <FormField id="customName" label="Activity Name">
                <input
                  type="text"
                  id="customName"
                  className="w-full p-2 border border-light3 rounded-md bg-theme"
                  value={formData.customName}
                  onChange={e =>
                    setFormData({ ...formData, customName: e.target.value })
                  }
                  placeholder="e.g., Car Trip to Office"
                  required
                />
              </FormField>

              <FormField id="customUnit" label="Unit of Measurement">
                <input
                  type="text"
                  id="customUnit"
                  className="w-full p-2 border border-light3 rounded-md bg-theme"
                  value={formData.customUnit}
                  onChange={e =>
                    setFormData({ ...formData, customUnit: e.target.value })
                  }
                  placeholder="e.g., km, hours, kWh"
                  required
                />
              </FormField>

              <FormField
                id="customCarbonPerUnit"
                label="Carbon Footprint per Unit (kg CO₂)"
              >
                <input
                  type="number"
                  id="customCarbonPerUnit"
                  min="0.01"
                  step="0.01"
                  className="w-full p-2 border border-light3 rounded-md bg-theme"
                  value={formData.customCarbonPerUnit || ''}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      customCarbonPerUnit: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="e.g., 0.12"
                  required
                />
              </FormField>
            </>
          )}

          {/* Common fields for all activity types */}
          {((selectedCategory && !isCustomCategory && formData.typeId) ||
            (isCustomCategory && formData.customName)) && (
            <>
              <FormField id="date" label="Date">
                <input
                  type="date"
                  id="date"
                  className="w-full p-2 border border-light3 rounded-md bg-theme"
                  value={formData.date}
                  onChange={e =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </FormField>

              <FormField
                id="quantity"
                label={`Quantity (${
                  isCustomCategory
                    ? formData.customUnit
                    : selectedType?.unit || 'units'
                })`}
              >
                <input
                  type="number"
                  id="quantity"
                  min="0.1"
                  step="0.1"
                  className="w-full p-2 border border-light3 rounded-md bg-theme"
                  value={formData.quantity}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      quantity: parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                />
              </FormField>

              <FormField id="notes" label="Notes (Optional)">
                <textarea
                  id="notes"
                  className="w-full p-2 border border-light3 rounded-md bg-theme"
                  value={formData.notes}
                  onChange={e =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={2}
                />
              </FormField>

              <CarbonFootprintDisplay value={calculateCarbonFootprint()} />

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-inverse p-3 rounded-md transition-colors text-lg font-medium"
              >
                Log Activity
              </button>
            </>
          )}
        </div>
      </form>
    </Card>
  );
}
