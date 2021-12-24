import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import InstantTradeToken from 'src/app/features/instant-trade/models/InstantTradeToken';
import InsufficientLiquidityError from 'src/app/core/errors/models/instant-trade/insufficient-liquidity.error';
import { MethodData } from 'src/app/shared/models/blockchain/MethodData';
import { AlgebraQuoterController } from '@features/instant-trade/services/instant-trade-service/providers/polygon/algebra-service/utils/quoter-controller/algebra-quoter-controller';
import {
  algebraConstants,
  maxTransitTokens,
  quoterContract
} from '@features/instant-trade/services/instant-trade-service/providers/polygon/algebra-service/algebra-constants';
import {
  AlgebraInstantTrade,
  AlgebraRoute
} from '@features/instant-trade/services/instant-trade-service/providers/polygon/algebra-service/models/algebra-instant-trade';
import { CommonUniV3AlgebraService } from '@features/instant-trade/services/instant-trade-service/providers/common/uni-v3-algebra/common-service/common-uni-v3-algebra.service';
import { EthLikeWeb3Public } from '@core/services/blockchain/blockchain-adapters/eth-like/web3-public/eth-like-web3-public';

@Injectable({
  providedIn: 'root'
})
export class AlgebraService extends CommonUniV3AlgebraService {
  private readonly quoterController: AlgebraQuoterController;

  constructor() {
    super(algebraConstants);

    this.quoterController = new AlgebraQuoterController(this.blockchainAdapter, quoterContract);

    this.useTestingModeService.isTestingMode.subscribe(isTestingMode => {
      if (isTestingMode) {
        this.quoterController.setTestingMode();
      }
    });
  }

  public async calculateTrade(
    fromToken: InstantTradeToken,
    fromAmount: BigNumber,
    toToken: InstantTradeToken
  ): Promise<AlgebraInstantTrade> {
    const { fromTokenWrapped, toTokenWrapped } = this.getWrappedTokens(fromToken, toToken);
    const fromAmountAbsolute = EthLikeWeb3Public.toWei(fromAmount, fromToken.decimals);

    const route = await this.getRoute(fromTokenWrapped, fromAmountAbsolute, toTokenWrapped);

    return {
      blockchain: this.blockchain,
      from: {
        token: fromToken,
        amount: fromAmount
      },
      to: {
        token: toToken,
        amount: EthLikeWeb3Public.fromWei(route.outputAbsoluteAmount, toToken.decimals)
      },
      path: route.path,
      route
    };
  }

  /**
   * Returns most profitable route.
   * @param fromToken From token.
   * @param fromAmountAbsolute From amount in Wei.
   * @param toToken To token.
   */
  private async getRoute(
    fromToken: InstantTradeToken,
    fromAmountAbsolute: string,
    toToken: InstantTradeToken
  ): Promise<AlgebraRoute> {
    const routes = (
      await this.quoterController.getAllRoutes(
        fromAmountAbsolute,
        fromToken,
        toToken,
        this.settings.disableMultihops ? 0 : maxTransitTokens
      )
    ).sort((a, b) => b.outputAbsoluteAmount.comparedTo(a.outputAbsoluteAmount));

    if (routes.length === 0) {
      throw new InsufficientLiquidityError();
    }
    return routes[0];
  }

  protected getSwapRouterExactInputMethodParams(
    route: AlgebraRoute,
    fromAmountAbsolute: string,
    toTokenAddress: string,
    walletAddress: string,
    deadline: number
  ): MethodData {
    const amountOutMin = this.getAmountOutMin(route);

    if (route.path.length === 2) {
      return {
        methodName: 'exactInputSingle',
        methodArguments: [
          [
            route.path[0].address,
            toTokenAddress,
            walletAddress,
            deadline,
            fromAmountAbsolute,
            amountOutMin,
            0
          ]
        ]
      };
    }
    return {
      methodName: 'exactInput',
      methodArguments: [
        [
          AlgebraQuoterController.getEncodedPath(route.path),
          walletAddress,
          deadline,
          fromAmountAbsolute,
          amountOutMin
        ]
      ]
    };
  }
}