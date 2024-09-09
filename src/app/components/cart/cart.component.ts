import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
private readonly _CartService = inject(CartService)
private readonly _Router = inject(Router)
  
  cartDetails : ICart = {} as ICart
  ngOnInit(): void {
      this._CartService.getProductsCart().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.cartDetails = res.data
        },
        error:(err)=>{ 
          console.log(err);
          
        }
      })
  }

  removeItem(id:string):void {
      this._CartService.deleteSpecificItem(id).subscribe({
        next:(res)=>{
          // console.log(res);
          this.cartDetails = res.data
          this._CartService.cartNumber.next(res.numOfCartItems)
        },
        error:(err)=>{ 
          console.log(err);
          
        }
      })
  }
  updateCount(id:string , count:number ):void {
    this._CartService.updateProductQuantity(id , count).subscribe({
      next:(res)=>{
        // console.log(res);
        this.cartDetails = res.data
        },
      error:(err)=>{ 
        console.log(err);
        
      }
    })
  }

  clearYourCart():void {
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        // console.log(res);
        if (res.message == "success") {
          this.cartDetails = {} as ICart
          this._CartService.cartNumber.next(0)
          this._Router.navigate(['/home'])
        }
        },
      error:(err)=>{ 
        console.log(err);
      }
    })
  }
}
