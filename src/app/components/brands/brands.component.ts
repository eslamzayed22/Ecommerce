import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandsService)
  brandsList:IBrands[] = []
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandsList = res.data;
        // console.log(res.data);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
