import { Country } from "../../src/entities/country.js";

describe('Country entity', () => {
    it('Should create a Country with valid data', () => {
        const city = Country.create('Brasil', 213000000, 'Português', "Real (R$)");
    });

    it('should throw when name is empty', () => {
        expect(() => Country.create('', 1000, 'Português', "Real (R$)")).toThrow('Country name is required');
    });

    it('should throw when language is empty', () => {
        expect(() => Country.create('Brasil', 1000, '', "Real (R$)")).toThrow('Country language is required');
    });

    it('should throw when coin is empty', () => {
        expect(() => Country.create('Brasil', 1000, 'Português', "")).toThrow('Country coin is required');
    });

    it('should throw when population is negative', () => {
        expect(() => Country.create('X', -1, 'Português', "Real (R$)")).toThrow('Population must be non-negative!');
    });
});