import { AxiosInstance, AxiosResponse } from 'axios';

import { ContractType } from '@cryptodo/contracts';

import { urls } from '@/api/contracts/contracts.api';

import { Request, Response } from './types';

export const createContract =
  (contractsApi: AxiosInstance) =>
  async (params: Request, type: ContractType): Promise<string> => {
    let url = urls.CREATE_ERC20_CONTRACT;
    switch (type) {
      case ContractType.erc20DefContract: {
        url = urls.CREATE_ERC20_DEF_CONTRACT;
        break;
      }
      case ContractType.icoContract: {
        url = urls.ICO_CONTRACT;
        break;
      }
      case ContractType.erc721Contract: {
        url = urls.CREATE_ERC721_CONTRACT;
        break;
      }
      case ContractType.daoContract: {
        url = urls.CREATE_DAO_CONTRACT;
        break;
      }
      case ContractType.lotteryContract:
        url = urls.CREATE_LOTTERY_CONTRACT;
        break;
      case ContractType.airDropContract: {
        url = urls.CREATE_AIRDROP_CONTRACT;
        break;
      }
      case ContractType.multisigContract: {
        url = urls.CREATE_MULTISIG_CONTRACT;
        break;
      }
      case ContractType.vestingContract: {
        url = urls.CREATE_VESTING_CONTRACT;
        break;
      }
      case ContractType.stakingContract: {
        url = urls.CREATE_STAKING_CONTRACT;
        break;
      }
      default: {
        url = urls.CREATE_ERC20_CONTRACT;
      }
    }

    const { data }: AxiosResponse<Response> = await contractsApi.post(
      url,
      params
    );

    return data?.id;
  };
