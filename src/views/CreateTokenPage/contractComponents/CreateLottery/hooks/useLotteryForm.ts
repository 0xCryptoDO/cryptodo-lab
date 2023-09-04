import useTranslation from 'next-translate/useTranslation';
import { toast } from 'react-toastify';

import { ContractType, LotteryType } from '@cryptodo/contracts';

import { Lottery } from '@/views/CreateToken/context/createToken.page.types';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { changeLotteryForm, initialLotteries } from '@/views/CreateToken/redux/createToken.slice';

import {
  MAX_DEVIATION_FROM_INITIAL_ALL_IR_NOTHING
} from '../constants/maximumDeviationFromInitialAllOrNothing';
import {
  MINIMAL_WINWIN_REWARD_RATIO
} from '../constants/minimalWinWinRewardRatio';

export const useLotteryForm = () => {
  const { lotteryType, lotteries } = useTypedSelector((state) => state.createToken[ContractType.lotteryContract]);
  
  const dispatch = useTypedDispatch();
  const { t } = useTranslation('CreateToken');

  const currentLottery =
    lotteryType !== null
      ? lotteries[lotteryType]
      : (null as unknown as Lottery);
  
  const handleChangeWinnersSlider = (value: number, index: number) => {
    
    const otherWinners = [
      ...currentLottery.winners.slice(0, index),
      ...currentLottery.winners.slice(index + 1),
    ];
    const winnersSum = otherWinners.reduce((prev, curr) => prev + curr);

    if (winnersSum + value > 100) {
      dispatch(changeLotteryForm({
        lotteries: {
          ...lotteries,
          [lotteryType as LotteryType]: {
            ...currentLottery,
            winners: [
              ...currentLottery.winners.slice(0, index),
              100 - winnersSum,
              ...currentLottery.winners.slice(index + 1),
            ],
          },
        },
      }));
      return;
    }

    if (
      lotteryType === LotteryType.winWin &&
      value / currentLottery.rewards[index] < MINIMAL_WINWIN_REWARD_RATIO
    ) {
      return;
    }

    const initialWinners =
      initialLotteries[LotteryType.allOrNothing].winners[index];

    if (
      lotteryType === LotteryType.allOrNothing &&
      (value > initialWinners + MAX_DEVIATION_FROM_INITIAL_ALL_IR_NOTHING || value < initialWinners - MAX_DEVIATION_FROM_INITIAL_ALL_IR_NOTHING)
    ) {
      return;
    }

    dispatch(changeLotteryForm({
      lotteries: {
        ...lotteries,
        [lotteryType as LotteryType]: {
          ...currentLottery,
          winners: [
            ...currentLottery.winners.slice(0, index),
            value,
            ...currentLottery.winners.slice(index + 1),
          ],
        },
      },
    }));
  };

  const handleChangeRewardsSlider = (value: number, index: number) => {
    const otherRewards = [
      ...currentLottery.rewards.slice(0, index),
      ...currentLottery.rewards.slice(index + 1),
    ];
    const rewardsSum = otherRewards.reduce((prev, curr) => prev + curr);

    if (rewardsSum + value > 100) {
      dispatch(changeLotteryForm({
        lotteries: {
          ...lotteries,
          [lotteryType as LotteryType]: {
            ...currentLottery,
            rewards: [
              ...currentLottery.rewards.slice(0, index),
              100 - rewardsSum,
              ...currentLottery.rewards.slice(index + 1),
            ],
          },
        },
      }));
      return;
    }
    if (
      lotteryType === LotteryType.winWin &&
      (currentLottery.winners[index] / value < MINIMAL_WINWIN_REWARD_RATIO || value === 0)
    ) {
      return;
    }

    const initialReward =
      initialLotteries[LotteryType.allOrNothing].rewards[index];

    if (
      lotteryType === LotteryType.allOrNothing &&
      (value > initialReward + MAX_DEVIATION_FROM_INITIAL_ALL_IR_NOTHING || value < initialReward - MAX_DEVIATION_FROM_INITIAL_ALL_IR_NOTHING)
    ) {
      return;
    }

    changeLotteryForm({
      lotteries: {
        ...lotteries,
        [lotteryType as LotteryType]: {
          ...currentLottery,
          rewards: [
            ...currentLottery.rewards.slice(0, index),
            value,
            ...currentLottery.rewards.slice(index + 1),
          ],
        },
      },
    });
  };

  const handleAddSlider = () => {
    const winnersSum = currentLottery.winners.reduce(
      (prev, curr) => prev + curr
    );
    const rewardsSum = currentLottery.rewards.reduce(
      (prev, curr) => prev + curr
    );

    if (winnersSum >= 100) {
      toast.error(t('winnersPercentageIsAlreadyMax') as string);
      return;
    }

    if (rewardsSum >= 100) {
      toast.error(t('rewardPercentageIsAlreadyMax') as string);
      return;
    }

    changeLotteryForm({
      lotteries: {
        ...lotteries,
        [lotteryType as LotteryType]: {
          ...currentLottery,
          rewards: [
            ...currentLottery.rewards,
            +((100 - rewardsSum) / 2).toFixed(0),
          ],
          winners: [
            ...currentLottery.winners,
            +((100 - winnersSum) / 2).toFixed(0),
          ],
        },
      },
    });
  };

  const handleDeleteSlider = (index: number) => {
    changeLotteryForm({
      lotteries: {
        ...lotteries,
        [lotteryType as LotteryType]: {
          ...currentLottery,
          rewards: [
            ...currentLottery.rewards.slice(0, index),
            ...currentLottery.rewards.slice(index + 1),
          ],
          winners: [
            ...currentLottery.winners.slice(0, index),
            ...currentLottery.winners.slice(index + 1),
          ],
        },
      },
    });
  };
  
  return { handleAddSlider, handleDeleteSlider, handleChangeRewardsSlider, handleChangeWinnersSlider };
}
