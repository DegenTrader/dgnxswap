import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBookTradePageRoutingModule } from './order-book-trade-page-routing.module';
import { OrderBookTradeComponent } from './components/order-book-trade/order-book-trade.component';
import { SharedModule } from '../../shared/shared.module';
import { OrderBookTradeResolver } from './components/order-book-trade/order-book-trade.resolver';

@NgModule({
  declarations: [OrderBookTradeComponent],
  imports: [CommonModule, OrderBookTradePageRoutingModule, SharedModule],
  providers: [OrderBookTradeResolver]
})
export class OrderBookTradePageModule {}
