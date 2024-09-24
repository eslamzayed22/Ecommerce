import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink, CurrencyPipe , SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  productsList:IProduct[] = []
  categoryList:ICategory[] = []
  text : string = "";

  getAllProductSub !: Subscription
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    items:1,
    nav: true
  }

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  ngOnInit(): void {
      this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categoryList = res.data;
          // console.log(res.data);
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
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
  ngOnDestroy(): void {
      this.getAllProductSub?.unsubscribe()
  }

  addToCart(id:string):void {
    this._CartService.addProductToCart(id).subscribe ({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message)
        this._CartService.cartNumber.next(res.numOfCartItems)
        console.log(res.numOfCartItems);
        
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
