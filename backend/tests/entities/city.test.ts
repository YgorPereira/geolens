import { City } from '../../src/entities/city.js';

describe('City entity', () => {
  it('should create a city with valid data', () => {
    const city = City.create('São Paulo', 12000000, -23.55, -46.63);
    expect(city.name).toBe('São Paulo');
    expect(city.population).toBe(12000000);
  });

  it('should throw when name is empty', () => {
    expect(() => City.create('', 1000, 0, 0)).toThrow('City Name is required!');
  });

  it('should throw when population is negative', () => {
    expect(() => City.create('X', -1, 0, 0)).toThrow('Population must be non-negative!');
  });
});
