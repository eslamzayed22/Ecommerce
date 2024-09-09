import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private readonly _CategoriesService = inject(CategoriesService)

  categoryList:ICategory[] = []
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
}

}
