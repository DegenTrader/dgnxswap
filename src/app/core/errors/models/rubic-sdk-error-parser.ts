import {
  nativeTokensList,
  RubicSdkError,
  TransactionRevertedError as SdkTransactionRevertedError,
  FailedToCheckForTransactionReceiptError as SdkFailedToCheckForTransactionReceiptError,
  UserRejectError as SdkUserRejectError,
  InsufficientFundsError as SdkInsufficientFundsError,
  LowGasError as SdkLowGasError,
  LowSlippageDeflationaryTokenError as SdkLowSlippageDeflationaryTokenError,
  InsufficientFundsOneinchError as SdkInsufficientFundsOneinchError,
  NotWhitelistedProviderError as SdkNotWhitelistedProviderError,
  WalletNotConnectedError as SdkWalletNotConnectedError,
  WrongNetworkError as SdkWrongNetworkError
} from 'rubic-sdk';
import { RubicError } from '@core/errors/models/rubic-error';
import { ERROR_TYPE } from '@core/errors/models/error-type';
import TransactionRevertedError from '@core/errors/models/common/transaction-reverted-error';
import FailedToCheckForTransactionReceiptError from '@core/errors/models/common/failed-to-check-for-transaction-receipt-error';
import { UserRejectError } from '@core/errors/models/provider/user-reject-error';
import InsufficientFundsError from '@core/errors/models/instant-trade/insufficient-funds-error';
import { LowGasError } from '@core/errors/models/provider/low-gas-error';
import { TokenWithFeeError } from '@core/errors/models/common/token-with-fee-error';
import InsufficientFundsOneinchError from '@core/errors/models/instant-trade/insufficient-funds-oneinch-error';
import NotWhitelistedProviderWarning from '@core/errors/models/common/not-whitelisted-provider.warning';
import { WalletError } from '@core/errors/models/provider/wallet-error';
import { NetworkError } from '@core/errors/models/provider/network-error';

export class RubicSdkErrorParser {
  private static parseErrorByType(
    err: RubicError<ERROR_TYPE> | RubicSdkError
  ): RubicError<ERROR_TYPE> {
    if (err instanceof SdkTransactionRevertedError) {
      return new TransactionRevertedError();
    }
    if (err instanceof SdkFailedToCheckForTransactionReceiptError) {
      return new FailedToCheckForTransactionReceiptError();
    }
    if (err instanceof SdkUserRejectError) {
      return new UserRejectError();
    }
    if (err instanceof SdkInsufficientFundsError) {
      return new InsufficientFundsError(
        err.token.symbol,
        err.balance.toFixed(),
        err.requiredBalance.toFixed()
      );
    }
    if (err instanceof SdkLowGasError) {
      return new LowGasError();
    }
    if (err instanceof SdkLowSlippageDeflationaryTokenError) {
      return new TokenWithFeeError();
    }
    if (err instanceof SdkInsufficientFundsOneinchError) {
      return new InsufficientFundsOneinchError(nativeTokensList[err.blockchain].symbol);
    }
    if (err instanceof SdkNotWhitelistedProviderError) {
      console.error('Provider router: ', err.providerRouter);
      if (err.providerGateway) {
        console.error('Provider gateway: ', err.providerGateway);
      }
      return new NotWhitelistedProviderWarning();
    }
    if (err instanceof SdkWalletNotConnectedError) {
      return new WalletError();
    }
    if (err instanceof SdkWrongNetworkError) {
      return new NetworkError(err.requiredBlockchain);
    }

    return RubicSdkErrorParser.parseErrorByMessage(err);
  }

  private static parseErrorByMessage(
    err: RubicError<ERROR_TYPE> | RubicSdkError
  ): RubicError<ERROR_TYPE> {
    if (err.stack?.includes('InsufficientFundsGasPriceValueError')) {
      return new RubicError(
        'Insufficient funds for gas fee. Decrease swap amount or increase native tokens balance.'
      );
    }
    if (err.message.includes('Request failed with status code 400')) {
      return new RubicError(
        'Oneinch provider is unavailable. Try to choose another or wait a few minutes.'
      );
    }
    if (err.message.includes('max fee per gas less than block base fee')) {
      return new RubicError(
        'Max fee per gas less than block base fee. Increase max gas in your wallet.'
      );
    }
    if (
      err.message.includes('Ok(OutOfFund)') ||
      err.message.includes('insufficient funds for transfer') ||
      err.message.includes('execution reverted: MetaRouter: second swap failed') ||
      err.message.includes('execution reverted: MetaRouter: other side call failed') ||
      err.message.includes('1inch sets increased costs on gas fee') ||
      err.message.includes('err: insufficient funds for gas * price + value') ||
      err.message.includes('insufficient balance for transfer') ||
      err.message.includes('Sender balance too low for value specified')
    ) {
      return new RubicError(
        'Insufficient funds for gas fee. Decrease swap amount or increase native tokens balance.'
      );
    }
    return new RubicError(err.message);
  }

  public static parseError(err: RubicError<ERROR_TYPE> | RubicSdkError): RubicError<ERROR_TYPE> {
    if (err instanceof RubicSdkError) {
      return RubicSdkErrorParser.parseErrorByType(err);
    }
    if (err?.message) {
      return RubicSdkErrorParser.parseErrorByMessage(err);
    }

    return err;
  }
}