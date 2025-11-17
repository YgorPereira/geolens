import { Continent } from "../../src/entities/continent.js";

describe('Continent entity', () => {
  it('Should create a Continent with valid data', () => {
    const continent = Continent.create('América do Sul', 'O Continente sul-americano');
    expect(continent).toBeInstanceOf(Continent);
    expect(continent.name).toBe('América do Sul');
    expect(continent.description).toBe('O Continente sul-americano');
  });

  it('should throw when name is empty', () => {
    expect(() => Continent.create('', 'O Continente sul-americano'))
      .toThrow('Continent name is required');
  });

  it('should throw when description is empty', () => {
    expect(() => Continent.create('América do Sul', ''))
      .toThrow('Continent description is required');
  });
});
