const {defaults: tsjPreset} =  require('ts-jest/presets')

module.exports = {
  preset: "@shelf/jest-mongodb",
  transform: tsjPreset.transform,
  roots: ['<rootDir>/src/']
};