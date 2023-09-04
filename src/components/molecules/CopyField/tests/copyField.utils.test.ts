import { ellipseAddress } from '@/components/molecules/CopyField/copyField.utils';

describe('copyField', () => {
  it('should ellipse address', () => {
    const result = ellipseAddress('ytryrtycvf322423fgfdgdfg43534gdfge5t3');
    
    expect(result).toBe('ytryrt...e5t3');
  });
});
