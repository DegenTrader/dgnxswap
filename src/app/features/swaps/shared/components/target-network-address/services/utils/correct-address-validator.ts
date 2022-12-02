import { BlockchainName, BlockchainsInfo, Web3Pure } from 'rubic-sdk';
import { AbstractControl, ValidatorFn } from '@ngneat/reactive-forms';
import { ValidationErrors } from '@ngneat/reactive-forms/lib/types';
import { blockchainRequiresAddress } from '@features/swaps/shared/components/target-network-address/services/constants/blockchain-requires-address';

// @TODO TEST UNIT 1
export function correctAddressValidator(
  fromBlockchain: BlockchainName,
  toBlockchain: BlockchainName
): ValidatorFn {
  const toChainType = BlockchainsInfo.getChainType(toBlockchain);

  return (control: AbstractControl): ValidationErrors | null => {
    const address = control.value;

    if (!Web3Pure[toChainType].isAddressCorrect(address)) {
      if (
        address ||
        (fromBlockchain !== toBlockchain &&
          blockchainRequiresAddress.some(el => el === fromBlockchain || el === toBlockchain))
      ) {
        return { wrongAddress: address };
      }
    }
    return null;
  };
}
