import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';

import { getLink, getStatistics, getWallet } from '@/api/billing/queries';
import { urls } from '@/api/billing';

describe('getRef', () => {
  describe('getStatistics', () => {
    it('should send a request to the server', async () => {
      const getMock = jest.fn().mockReturnValue({ data: 2 });

      const axiosInstance = {
        get: getMock,
      };

      const api = getStatistics(axiosInstance as unknown as AxiosInstance);
      const result = await api();

      expect(getMock).toBeCalledTimes(1);
      expect(getMock).toBeCalledWith(urls.GET_REFERRAL_STATISTICS);
      expect(result).toBe(2);
    });
  });

  describe('getLink', () => {
    it('should send a request to the server', async () => {
      const getMock = jest.fn().mockReturnValue({ data: 2 });

      const axiosInstance = {
        get: getMock,
      };

      const api = getLink(axiosInstance as unknown as AxiosInstance);
      const result = await api();

      expect(getMock).toBeCalledTimes(1);
      expect(getMock).toBeCalledWith(urls.GET_REFERRAL_LINK);
      expect(result).toBe(undefined);
    });
  });

  describe('getWallet', () => {
    it('should send a request to the server', async () => {
      const getMock = jest.fn().mockReturnValue({ data: 1 });

      const axiosInstance = {
        get: getMock,
      };

      const api = getWallet(axiosInstance as unknown as AxiosInstance);
      const result = await api();

      expect(getMock).toBeCalledTimes(1);
      expect(getMock).toBeCalledWith(urls.GET_REFERRAL_WALLET);
      expect(result).toBe(undefined);
    });
  });
});
