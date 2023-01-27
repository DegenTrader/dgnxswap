import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ApproveTransaction } from '@features/approve-scanner/services/approve-scanner.service';
import { FormControl } from '@angular/forms';
import ADDRESS_TYPE from '@app/shared/models/blockchain/address-type';
import { BlockchainName } from 'rubic-sdk';

@Component({
  selector: 'app-desktop-table',
  templateUrl: './desktop-table.component.html',
  styleUrls: ['./desktop-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopTableComponent {
  @Input() public readonly approves: ApproveTransaction[];

  @Input() public readonly allApproves: ApproveTransaction[];

  @Input() public readonly page: number;

  @Input() public readonly size: number;

  @Input() public readonly isLimitsExceeded: boolean;

  @Input() public readonly allowChangeBlockchain: boolean;

  @Input() public readonly tokenControl: FormControl<string>;

  @Input() public readonly spenderControl: FormControl<string>;

  @Input() public readonly switchLoading: boolean;

  @Input() public readonly tableLoading: boolean;

  @Input() public readonly selectedBlockchain: BlockchainName;

  @Output() public readonly handleNetworkChange = new EventEmitter<() => void>();

  @Output() public readonly handleRevokeCall = new EventEmitter<{
    token: string;
    spender: string;
    callback: () => void;
  }>();

  public readonly assetMaskConfig = {
    guide: false,
    mask: (sourceText: string) => {
      return Array.from(sourceText).map(() => new RegExp('^[A-Za-z0-9]+$'));
    }
  };

  public readonly spenderMaskConfig = {
    guide: false,
    mask: (sourceText: string) => {
      return Array.from(sourceText).map(() => new RegExp('^[A-Fa-f0-9]+$'));
    }
  };

  public readonly ADDRESS_TYPE = ADDRESS_TYPE;

  constructor() {}

  public changeNetwork(callback: () => void): void {
    this.handleNetworkChange.emit(callback);
  }

  public handleRevoke(token: string, spender: string, callback: () => void): void {
    this.handleRevokeCall.emit({ token, spender, callback });
  }
}
