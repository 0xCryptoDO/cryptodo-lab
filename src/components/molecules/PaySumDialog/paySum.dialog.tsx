import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Currencies, Network, networkCurrencies } from '@cryptodo/contracts';

import { useContractCost } from '@/hooks';
import {
  Button,
  Dialog,
  Divider,
  Loader,
  Select,
  Space,
  Text,
} from '@/components';
import { currenciesMeta } from '@/utils/currencies';
import { networksMeta } from '@/utils/networks';
import { useTypedDispatch, useTypedSelector } from '@/reduxStore';
import { setPaymentCurrency, setPaymentNetwork } from '@/reduxStore/slices/contracts/contracts.slice';

import { PaySumDialogProps } from './paySum.types';
import * as S from './paySum.style';

export const PaySumDialog: FC<PaySumDialogProps> = (props) => {
  const {
    open,
    toggle,
    testnet,
    submit,
    approve,
    approvedAmount,
    approveLoading,
    options,
    id,
    type,
    onClose,
  } = props;
  
  const token = useTypedSelector((state) => state.auth.token);
  const { currency: paymentCurrency, network: paymentNetwork } = useTypedSelector((state) => state.contracts.payment);


  const dispatch = useTypedDispatch();
  const { t } = useTranslation('CreateToken');
  
  // prevent fetching contract cost when pay sum dialog isn't opened;
  const contractCost = useContractCost({
    currency: paymentCurrency,
    token,
    options,
    type,
    preventFetching: !open,
  });
  const isMainCurrency = networkCurrencies[paymentNetwork][paymentCurrency] === null;
  const needApprove =
    !isMainCurrency &&
    contractCost &&
    contractCost.value &&
    approvedAmount &&
    contractCost.value > +approvedAmount;
  const postLabel = testnet ? t('postToTestnet') : t('post');
  const buttonLabel = needApprove ? t('common:approve') : postLabel;
  const onNetworkSelected = (value: string) => {
    dispatch(setPaymentNetwork(value as Network));
    dispatch(setPaymentCurrency(
      Object.keys(networkCurrencies[value as Network])[0] as Currencies
    ));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onOpenChange={toggle}
      title={t('total')}
      closeIcon
      action={
        <div style={{ width: '100%' }}>
          <Button
            stretch
            onClick={(e) => {
              if (needApprove && approve && contractCost?.value) {
                e.preventDefault();
                approve(contractCost.value);
              } else if (!needApprove) {
                submit(id);
              }
            }}
            css={{ marginTop: '1rem' }}
          >
            {approveLoading || !contractCost?.value ? (
              <Loader width={16} height={16} color="white" />
            ) : (
              <S.PayButtonContent>
                {currenciesMeta[paymentCurrency]?.logo}
                {buttonLabel}
              </S.PayButtonContent>
            )}
          </Button>
        </div>
      }
    >
      {!contractCost?.value || contractCost.isValidating ? (
        <Loader width={16} height={16} color="white" />
      ) : (
        <S.Prices>
          <S.PricesItem>
            <Text type="secondary">{t('contractDeployment')}</Text>
            <Text>{contractCost?.originalCost.toFixed(2)} USD</Text>
          </S.PricesItem>
          {Object.entries(contractCost.options).map(([key, val]) => (
            <S.PricesItem key={key}>
              <Text type="secondary">{key}</Text>
              <Text>{(val as number).toFixed(2)} USD</Text>
            </S.PricesItem>
          ))}
          <Divider />
          <S.PricesItem>
            <Text type="secondary">{t('total')}</Text>
            <Text>
              {testnet
                ? t('free')
                : `(${contractCost.usdEq.toFixed(2)} USD) ${contractCost.el}`}
            </Text>
          </S.PricesItem>
        </S.Prices>
      )}
      <Space direction="vertical">
        <Text size="small" className="mt-md">
          {t('selectedBlockchain')}
          <Text type="danger" size="small">
            *
          </Text>
        </Text>
        <Select
          value={paymentNetwork}
          onChange={onNetworkSelected}
          items={Object.entries(networksMeta)
            .filter(([, networkMeta]) => !networkMeta.paymentsDisabled)
            .map(([network, networkMeta]) => ({
              value: network,
              label: (
                <S.SelectItem>
                  {' '}
                  <div>{networkMeta.logo}</div>{' '}
                  <div>{networkMeta.description}</div>
                </S.SelectItem>
              ),
            }))}
        />

        <S.Currencies>
          {Object.keys(networkCurrencies[paymentNetwork as Network]).map(
            (currency) => (
              <S.Currency
                isActive={paymentCurrency === currency}
                type="button"
                onClick={() => {
                  dispatch(setPaymentCurrency(currency as Currencies));
                }}
                key={currenciesMeta[currency as Currencies]?.name}
              >
                <Space align="center">
                  <S.CurrenciesIcon>
                    {' '}
                    {currenciesMeta[currency as Currencies]?.logo}
                  </S.CurrenciesIcon>
                  <Text weight="normal">
                    {currenciesMeta[currency as Currencies]?.name}{' '}
                    <Text type="secondary" weight="normal">
                      {currenciesMeta[currency as Currencies]?.symbol}
                    </Text>
                  </Text>
                </Space>
              </S.Currency>
            )
          )}
        </S.Currencies>
      </Space>
    </Dialog>
  );
};
