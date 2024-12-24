// jest.config.js
export default {
  // Use the ESM preset for TypeScript
  preset: 'ts-jest/presets/default-esm',

  // Include extensions to treat as ESM
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Transform settings
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },

  // Adjust module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Configure module name mapping if necessary
  moduleNameMapper: {},
}
