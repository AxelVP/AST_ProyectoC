import { NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import { ArticulosComponent } from './components/articulos/articulos.component';
//import { ComprasComponent} from './components/compras/compras.component'

const routes: Routes = [
    {path: 'tienda/mostrar', component: ArticulosComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

