import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  existingRecipe: Recipe;
  editMode: boolean;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  onSubmit(): void{
    const id: number = this.editMode ? this.existingRecipe.id : Math.floor(Math.random() * 1000);
    const recipe: Recipe = new Recipe(id,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);

    if(this.editMode){
      this.recipeService.updateRecipe(recipe);
    } else{
      this.recipeService.addRecipe(recipe);
    }
  }

  ngOnInit(): void {

    this.route.data.subscribe(({ recipe }) => {
      this.editMode = false;
      this.existingRecipe = null;
      let ingredients = new FormArray([]);
      if(recipe) {
        this.editMode = true;
        this.existingRecipe = recipe;
        for(let ingredient of recipe.ingredients){
          ingredients.push(new FormGroup({
            'name' : new FormControl(ingredient.name, Validators.required),
            'amount' : new FormControl(ingredient.amount, Validators.required)
          }));
        }
      }
      this.initForm(recipe || {}, ingredients);
      console.log('pause');
    });

  }

  addIngredient(): void{
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, Validators.required)
    }));
  }

  removeIngredient(i) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  private initForm(recipe: Recipe = null, ingredients: FormArray = new FormArray([])): void{
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipe.name, [Validators.required, Validators.maxLength(50)]),
      'description' : new FormControl(recipe.description, [Validators.required, Validators.maxLength(255)]),
      'imagePath' : new FormControl(recipe.imagePath),
      'ingredients' : ingredients
    });
  }
}
