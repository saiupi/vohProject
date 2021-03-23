import { PaymentService } from './../../service-module/payment.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  options: FormGroup;
  orderId = new FormControl(101, Validators.min(1));
  amount = new FormControl(100, Validators.min(1));
  currency = new FormControl('INR');
  constructor(fb: FormBuilder, private pay: PaymentService) {
    this.options = fb.group({
      orderId: this.orderId,
      amount: this.amount,
      currency: this.currency,
    });
  }

  ngOnInit() {}

  getOrderId() {
    return `${Math.max(1, this.orderId.value)}`;
  }

  getAmount() {
    return Math.max(1, this.amount.value);
  }

  getCurrency() {
    return this.currency.value;
  }

  async onSubmit() {
    console.log('Order Id', this.getOrderId());
    console.log('Amount', this.getAmount());
    console.log('Currency', this.getCurrency());
    const url = await this.pay.getPaymentUrl(
      this.getOrderId(),
      this.getCurrency(),
      this.getAmount()
    );

    window.location.href = url;
  }
}
