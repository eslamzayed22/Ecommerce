import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)

  customOptionsdetl: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  detailsProduct:IProduct |null = null;
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          let idProduct = p.get('id');
          this._ProductsService.getSpecificProducts(idProduct).subscribe ({
            next:(res)=>{
              // console.log(res.data);
              this.detailsProduct = res.data
            },
            error:(err)=>{
              console.log(err);
              
            }
          })
        }
      })
  }
}
