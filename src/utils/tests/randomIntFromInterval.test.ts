import { randomIntFromInterval } from '@/utils';

describe('randomIntFromInterval', () => {
  it('should be equal or greater than min value', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    
    const result = randomIntFromInterval(2, 12);
    
    expect(result).toBe(2);
  });

  it('should be equal or smaller than max value', () => {
    jest.spyOn(Math, 'random').mockReturnValue(1);

    const result = randomIntFromInterval(2, 12);

    expect(result).toBe(12);
  });
});
