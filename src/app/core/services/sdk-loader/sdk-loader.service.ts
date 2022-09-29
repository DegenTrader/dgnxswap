import { Inject, Injectable } from '@angular/core';
import { RubicSdkService } from '@app/features/swaps/core/services/rubic-sdk-service/rubic-sdk.service';
import { IframeService } from '@core/services/iframe/iframe.service';
import { AuthService } from '@core/services/auth/auth.service';
import { filter } from 'rxjs/operators';
import { switchTap } from '@shared/utils/utils';
import { CHAIN_TYPE, WalletProvider } from 'rubic-sdk';
import { from } from 'rxjs';
import { WalletConnectorService } from '@core/services/wallets/wallet-connector-service/wallet-connector.service';
import { WINDOW } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root'
})
export class SdkLoaderService {
  constructor(
    private readonly sdkService: RubicSdkService,
    private readonly iframeService: IframeService,
    private readonly authService: AuthService,
    private readonly walletConnectorService: WalletConnectorService,
    @Inject(WINDOW) private readonly window: Window
  ) {}

  public async initSdk(): Promise<void> {
    this.subscribeOnAddressChange();
    await this.sdkService.initSDK(
      new URLSearchParams(this.window.location.search).get('feeTarget') || undefined
    );
    await this.loadUser();
  }

  private async loadUser(): Promise<void> {
    const { isIframe } = this.iframeService;
    if (!isIframe) {
      await this.authService.loadStorageUser();
    }
  }

  private subscribeOnAddressChange(): void {
    this.walletConnectorService.addressChange$
      .pipe(
        filter(Boolean),
        switchTap(address => {
          const chainType = this.walletConnectorService.chainType;
          const provider = this.walletConnectorService.provider;
          const walletProvider: WalletProvider = {
            [chainType]: {
              address,
              core: chainType === CHAIN_TYPE.EVM ? provider.wallet : provider.wallet.tronWeb
            }
          };
          return from(this.sdkService.patchConfig({ walletProvider }));
        })
      )
      .subscribe();
  }
}