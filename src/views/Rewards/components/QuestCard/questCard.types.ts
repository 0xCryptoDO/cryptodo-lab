import { ContractType, IUserQuestProgress, Network, Quests } from '@cryptodo/contracts';

export interface QuestCardProps {
  quests: Quests;
  title: ContractType;
  networks: {
    name: Network;
    testnet: number;
    mainnet: number;
  }[];
  points: {
    testnet: number;
    mainnet: number;
  };
  progress: IUserQuestProgress;
  maxContracts: {
    testnet: number;
    mainnet: number;
  };
  onCreate?: (type: ContractType) => void;
}
