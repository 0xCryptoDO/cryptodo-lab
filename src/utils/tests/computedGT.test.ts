import { calcPercent, computedGT } from '@/utils/computedGT';

describe('computedGT', () => {
  describe('computedGT', () => {
    it('should return the sum of all partners GTamount', () => {
      const result = computedGT([{ partnerAddress: 'asfdsfsd', GTAmount: 2 }, {
        partnerAddress: 'asfdsfsdfsdfsd',
        GTAmount: 3,
      }, { partnerAddress: 'asfdsfsdxcvxcv', GTAmount: 4 }]);

      expect(result).toBe(9);
    });

    it('should return 0 if partners empty', () => {
      const result = computedGT([]);

      expect(result).toBe(0);
    });
  });

  describe('calcPercent', () => {
    it('should return 0 if amountGT equals 0', () => {
      const result = calcPercent(2, 0);

      expect(result).toBe(0);
    });

    it('should return percent of computed if amountGT not equals 0', () => {
      const result = calcPercent(2, 0.7);

      expect(result).toBe('35.00');
    });

    it('should return percent with 2 fixed symbols of computed if amountGT not equals 0', () => {
      const result = calcPercent(900, 887);

      expect(result).toBe('98.56');
    });
  });
});
