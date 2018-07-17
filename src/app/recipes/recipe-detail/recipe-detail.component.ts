import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) { }

  addToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ recipe }) => {
      if(!recipe){
        this.router.navigate(['/']);
      }
      this.recipe = recipe;
    });
  }
}
