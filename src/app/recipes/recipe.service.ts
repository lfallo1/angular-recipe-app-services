import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {

  recipeWasSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('salt', 2), new Ingredient('flour', 7)]),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('cheese', 2), new Ingredient('chicken', 3), new Ingredient('cream', 1)])
  ];

  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }

  selectRecipe(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
