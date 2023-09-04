import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';
import { ContractType } from '@cryptodo/contracts/lib/constants';

import { urls } from '@/api/contracts';
import { getDeployInfo } from '@/api/contracts/mutations';

describe('deployContract', () => {
  const params = {
    contractId: '1',
    testnet: true,
  }

  it('should send a request to the server if contract type is daoContract', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      get: getMock,
    };

    const api = getDeployInfo(axiosInstance as unknown as AxiosInstance);
    const result = await api({ ...params, contractType: ContractType.daoContract });

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_DEPLOY_INFO, { params: { ...params, contractType: ContractType.daoContract }, timeout: 30000 });
    expect(result).toBe(1);
  });

  it('should send a request to the server if contract type is erc721Contract', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      get: getMock,
    };

    const api = getDeployInfo(axiosInstance as unknown as AxiosInstance);
    const result = await api({ ...params, contractType: ContractType.erc721Contract });

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_DEPLOY_INFO, { params: { ...params, contractType: ContractType.erc721Contract }, timeout: 30000 });
    expect(result).toBe(1);
  });

  it('should send a request to the server if contract type is erc20DefContract', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      get: getMock,
    };

    const api = getDeployInfo(axiosInstance as unknown as AxiosInstance);
    const result = await api({ ...params, contractType: ContractType.erc20DefContract });

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_DEPLOY_INFO, { params: { ...params, contractType: ContractType.erc20DefContract }, timeout: 30000 });
    expect(result).toBe(1);
  });

  it('should send a request to the server if contract type is erc20Contract', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      get: getMock,
    };

    const api = getDeployInfo(axiosInstance as unknown as AxiosInstance);
    const result = await api({ ...params, contractType: ContractType.erc20Contract });

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_DEPLOY_INFO, { params: { ...params, contractType: ContractType.erc20Contract }, timeout: 30000 });
    expect(result).toBe(1);
  });

  it('should send a request to the server if contract type is icoContract', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      get: getMock,
    };

    const api = getDeployInfo(axiosInstance as unknown as AxiosInstance);
    const result = await api({ ...params, contractType: ContractType.icoContract });

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_DEPLOY_INFO, { params: { ...params, contractType: ContractType.icoContract }, timeout: 30000 });
    expect(result).toBe(1);
  });

  it('should send a request to the server if contract type is lottery', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      get: getMock,
    };

    const api = getDeployInfo(axiosInstance as unknown as AxiosInstance);
    const result = await api({ ...params, contractType: ContractType.lotteryContract });

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_DEPLOY_INFO, { params: { ...params, contractType: ContractType.lotteryContract }, timeout: 30000 });
    expect(result).toBe(1);
  });

  it('should send a request to the server if contract type is airDrop', async () => {
    const getMock = jest.fn().mockReturnValue({ data: 1 });

    const axiosInstance = {
      get: getMock,
    };

    const api = getDeployInfo(axiosInstance as unknown as AxiosInstance);
    const result = await api({ ...params, contractType: ContractType.airDropContract });

    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith(urls.GET_DEPLOY_INFO, { params: { ...params, contractType: ContractType.airDropContract }, timeout: 30000 });
    expect(result).toBe(1);
  });
});
