import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onIngredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Sugar', 2),
    new Ingredient('Flour', 1)
  ]

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._addIngredient(ingredient);
    this.onIngredientsChanged.emit(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(i => this._addIngredient(i));
    this.onIngredientsChanged.emit(this.getIngredients());
  }

  private _addIngredient(ingredient: Ingredient){
    const existingIngredient = this.ingredients.filter(i => i.name.toLowerCase() === ingredient.name.toLowerCase())[0];
    if(existingIngredient){
      existingIngredient.amount += Number(ingredient.amount);
    } else{
      this.ingredients.push(ingredient);
    }
  }
}
