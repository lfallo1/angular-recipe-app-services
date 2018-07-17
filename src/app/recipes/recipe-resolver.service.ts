import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return new Promise((resolve, reject)=>{
      const recipe = this.recipeService.findById(+route.params.id);
      if(!recipe){
        this.router.navigate(['page-not-found']);
        resolve();
        return;
      }
      resolve(recipe);
    })
  }
}
