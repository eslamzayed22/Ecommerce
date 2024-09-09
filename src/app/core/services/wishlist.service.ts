import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient :HttpClient) { }

  myHeaders:any = {token:localStorage.getItem('userToken')}

  addProductToWishlist(id:string):Observable<any> {

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {"productId": id},
      { headers:this.myHeaders}
    ) 
  }

  getProductsWishlist():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,
      { headers:this.myHeaders}
    ) 
  }

  deleteSpecificItem(id:string):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
      { headers:this.myHeaders}
    ) 
  }

}
