import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { AnswersComponent } from './answers/answers.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent
  },
  {
    path: 'answers/:id',
    component: AnswersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
