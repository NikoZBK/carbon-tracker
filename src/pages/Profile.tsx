import { useState, ChangeEvent } from 'react';
import { Card } from '../components/ui';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    location: 'Boston, MA',
    joinDate: 'March 2025',
    carbonGoal: 8, // kg per day
    notifications: true,
    weeklyReport: true,
    theme: 'system',
  });

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const target = e.target as HTMLInputElement;

    setUser({
      ...user,
      [name]: target.type === 'checkbox' ? target.checked : value,
    });
  };

  return (
    <>
      <h1 className="text-title">Profile</h1>

      {/* User Information */}
      <Card className="md:col-span-1">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-light3 mb-4 flex items-center justify-center text-4xl text-dark1">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
          <p className="text-dark1">{user.location}</p>
          <p className="text-sm text-dark2 mt-2">
            Member since {user.joinDate}
          </p>
        </div>

        <div className="bg-light2 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">Carbon Impact</h3>
          <div className="flex justify-between mb-1">
            <span className="text-dark1">Total Reduction</span>
            <span className="font-medium">248 kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark1">Activities Logged</span>
            <span className="font-medium">78</span>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Achievements</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-light2 rounded-lg p-2 text-center">
              <span className="block text-lg">🚲</span>
              <span className="text-xs">Cyclist</span>
            </div>
            <div className="bg-light2 rounded-lg p-2 text-center">
              <span className="block text-lg">🌱</span>
              <span className="text-xs">Plant-based</span>
            </div>
            <div className="bg-light2 rounded-lg p-2 text-center">
              <span className="block text-lg">⚡</span>
              <span className="text-xs">Energy Saver</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-dark1 mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full p-2 border border-light3 rounded-md bg-theme"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-dark1 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-2 border border-light3 rounded-md bg-theme"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-dark1 mb-1" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="w-full p-2 border border-light3 rounded-md bg-theme"
              value={user.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="font-medium mb-2">Carbon Goals</h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-dark1 mb-1" htmlFor="carbonGoal">
              Daily Carbon Goal (kg CO₂)
            </label>
            <input
              id="carbonGoal"
              name="carbonGoal"
              type="number"
              min="1"
              max="50"
              className="w-full p-2 border border-light3 rounded-md bg-theme"
              value={user.carbonGoal}
              onChange={handleChange}
            />
            <p className="text-xs text-dark1 mt-1">
              The global sustainable average is around 11kg CO₂ per day
            </p>
          </div>
        </div>

        <h3 className="font-medium mb-2">Preferences</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="notifications"
              name="notifications"
              type="checkbox"
              className="mr-2"
              checked={user.notifications}
              onChange={handleChange}
            />
            <label htmlFor="notifications">Enable notifications</label>
          </div>

          <div className="flex items-center">
            <input
              id="weeklyReport"
              name="weeklyReport"
              type="checkbox"
              className="mr-2"
              checked={user.weeklyReport}
              onChange={handleChange}
            />
            <label htmlFor="weeklyReport">Receive weekly carbon report</label>
          </div>

          <div className="mt-4">
            <label className="block text-dark1 mb-1" htmlFor="theme">
              Theme Preference
            </label>
            <select
              id="theme"
              name="theme"
              className="w-full p-2 border border-light3 rounded-md bg-theme"
              value={user.theme}
              onChange={handleChange}
            >
              <option value="system">System Default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
            Save Changes
          </button>
        </div>
      </Card>

      {/* Environmental Impact Data */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-light2 p-4 rounded-lg text-center">
            <span className="text-2xl font-bold block">248</span>
            <span className="text-sm text-dark1">kg CO₂ Saved</span>
          </div>
          <div className="bg-light2 p-4 rounded-lg text-center">
            <span className="text-2xl font-bold block">12</span>
            <span className="text-sm text-dark1">Trees Equivalent</span>
          </div>
          <div className="bg-light2 p-4 rounded-lg text-center">
            <span className="text-2xl font-bold block">78</span>
            <span className="text-sm text-dark1">Activities Logged</span>
          </div>
          <div className="bg-light2 p-4 rounded-lg text-center">
            <span className="text-2xl font-bold block">3</span>
            <span className="text-sm text-dark1">Achievements</span>
          </div>
        </div>

        <p className="text-sm text-dark1 mt-6">
          Your efforts have made a difference! By reducing your carbon
          footprint, you've contributed to a more sustainable future. Continue
          tracking your activities to earn more achievements and increase your
          positive impact.
        </p>
      </Card>
    </>
  );
}
