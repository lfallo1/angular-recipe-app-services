import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(1, 'A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('salt', 2), new Ingredient('flour', 7)]),
    new Recipe(2, 'Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('cheese', 2), new Ingredient('chicken', 3), new Ingredient('cream', 1)])
  ];

  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }

  findById(id: number) {
    return this.recipes.find(r=>r.id === id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(recipe: Recipe){
    let existingRecipe = this.findById(recipe.id);
    existingRecipe = recipe;
    this.recipesChanged.next(this.recipes);
  }
}
