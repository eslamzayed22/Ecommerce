import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { IWishlist } from '../../core/interfaces/iwishlist';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  wishlistDetails: IWishlist[] = [];
  private getAllWishlistItem!: Subscription;

  ngOnInit(): void {
    this.getAllWishlistItems();
  }

  ngOnDestroy(): void {
    if (this.getAllWishlistItem) {
      this.getAllWishlistItem.unsubscribe();
    }
  }

  getAllWishlistItems(): void {
    this.getAllWishlistItem = this._WishlistService.getProductsWishlist().subscribe({
      next: (res) => {
        this.wishlistDetails = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  removeItem(id: string): void {
    this._WishlistService.deleteSpecificItem(id).subscribe({
      next: (res) => {
        this._ToastrService.warning('Item removed from wishlist');
        this.getAllWishlistItems(); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
}
