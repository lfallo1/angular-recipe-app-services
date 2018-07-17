import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecipesComponent} from '../recipes/recipes.component';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {RecipeDetailComponent} from '../recipes/recipe-detail/recipe-detail.component';
import {RecipeResolverService} from '../recipes/recipe-resolver.service';

const appRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent, children: [
      { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolverService } }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{

}
