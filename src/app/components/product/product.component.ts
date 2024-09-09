import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)



  productsList:IProduct[] = []
  text : string = "";
  getAllProductSub !: Subscription

  ngOnInit(): void {
    this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.productsList = res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    this._WishlistService.getProductsWishlist().subscribe({
      next:(res)=>{
        // console.log(res);
        this.wishlistData = res.data.map((product:any)=>product._id)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  addToCart(id:string):void {
    this._CartService.addProductToCart(id).subscribe ({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  wishlistData:string[]=[]

  addToWishlist(id:string):void {
    this._WishlistService.addProductToWishlist(id).subscribe ({
      next:(res)=>{
        // console.log(res);
        this._ToastrService.success(res.message)
        this.wishlistData =res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  removeFromWishlist(id:string){
    this._WishlistService.deleteSpecificItem(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.wishlistData =res.data
        this._ToastrService.warning(res.message)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
