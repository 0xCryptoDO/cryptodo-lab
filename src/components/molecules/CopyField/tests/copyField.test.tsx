import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CopyField } from '@/components';

import * as copyFieldUtils from '../copyField.utils';

const content = 'dasdas';
const placeholder = 'vcxvxcvx';

describe('CopyField', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with content and ellipse', () => {
    const ellipseAddressSpy = jest
      .spyOn(copyFieldUtils, 'ellipseAddress')
      .mockImplementation((val: any) => val);

    render(<CopyField content={content} placeholder={placeholder} elipse />);

    expect(screen.getByText(content)).toBeInTheDocument();
    expect(ellipseAddressSpy).toBeCalledTimes(1);
    expect(ellipseAddressSpy).toBeCalledWith(content);
  });

  it('should render correctly with placeholder and ellipse', () => {
    const ellipseAddressSpy = jest
      .spyOn(copyFieldUtils, 'ellipseAddress')
      .mockImplementation((val: any) => val);

    render(<CopyField placeholder={placeholder} elipse />);

    expect(screen.getByText(placeholder)).toBeInTheDocument();
    expect(ellipseAddressSpy).toBeCalledTimes(2);
    expect(ellipseAddressSpy).toBeCalledWith(placeholder);
  });

  it('should render correctly with placeholder and without ellipse', () => {
    const ellipseAddressSpy = jest
      .spyOn(copyFieldUtils, 'ellipseAddress')
      .mockImplementation((val: any) => val);

    render(<CopyField placeholder={placeholder} />);

    expect(screen.getByText(placeholder)).toBeInTheDocument();
    expect(ellipseAddressSpy).toBeCalledTimes(0);
  });

  it('should render correctly with content and without ellipse', () => {
    const ellipseAddressSpy = jest
      .spyOn(copyFieldUtils, 'ellipseAddress')
      .mockImplementation((val: any) => val);

    render(<CopyField placeholder={placeholder} content={content} />);

    expect(screen.getByText(content)).toBeInTheDocument();
    expect(ellipseAddressSpy).toBeCalledTimes(0);
  });
});
