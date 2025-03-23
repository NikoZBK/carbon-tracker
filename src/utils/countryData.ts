/**
 * Utility functions for working with country emissions data
 */

/**
 * Get a list of available countries from the datasets folder
 * @returns Array of country IDs sorted alphabetically
 */
export function getAvailableCountries(): string[] {
  // Return a list of countries only (no regions/groups), sorted alphabetically
  return [
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall_Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia_country',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New_Caledonia',
    'New_Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'North_Korea',
    'North_Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua_New_Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint_Helena',
    'Saint_Kitts_and_Nevis',
    'Saint_Lucia',
    'Saint_Pierre_and_Miquelon',
    'Saint_Vincent_and_the_Grenadines',
    'Samoa',
    'United_States',
  ].sort(); // Alphabetically sort the countries
}

/**
 * Parse emissions data from CSV content
 * @param csvContent Raw CSV content as string
 * @returns Parsed emissions data objects
 */
export function parseEmissionsCSV(csvContent: string) {
  const rows = csvContent.split('\n').slice(1); // Skip header

  return rows
    .filter(row => row.trim() !== '')
    .map(row => {
      const columns = row.split(',');
      return {
        country: columns[0],
        year: parseInt(columns[1], 10),
        totalEmissions: parseFloat(columns[4]) / 1e9, // Convert to billion tons
        perCapitaEmissions: parseFloat(columns[5]),
        // Add other metrics as needed
      };
    })
    .filter(data => !isNaN(data.year) && !isNaN(data.totalEmissions));
}
