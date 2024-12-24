// jest.config.js
export default {
  // Use the ESM preset for TypeScript
  preset: 'ts-jest/presets/default-esm',

  // Tell Jest to handle ESM modules
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },

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
