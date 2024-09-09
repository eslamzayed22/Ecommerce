import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)

  cartId:string | null = ""
  checkout:FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required , Validators.email]],
    phone: [null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null, [Validators.required]],
  })

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.cartId = params.get('id')
          
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }
  ordersSubmit():void {
    console.log(this.checkout.value);
    this._OrdersService.checkOut(this.cartId, this.checkout.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status === 'success') {
          window.open(res.session.url, '_self')
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
