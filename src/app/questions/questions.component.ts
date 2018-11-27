import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class QuestionsComponent implements OnInit {

  questions$: Object = {};
  searchText: String = '';
  routeParams: any = {};
  
  constructor(private data: DataService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.routeParams = this.activatedRoute.snapshot.queryParams;
  }

  ngOnInit() {
    const tags = this.activatedRoute.snapshot.queryParams.tags ? this.activatedRoute.snapshot.queryParams.tags : '';
    this.searchText = tags; 
    this.data.getQuestions(tags).subscribe((questions) => {
      this.questions$ = questions;
    });
  }

  routeToAnswers(id, title) {
    this.routeParams = {...this.routeParams, title};
    this.router.navigate([`/answers/${id}`], { queryParams: this.routeParams });
  }

  search(e) {
    e.preventDefault();

    const tags= this.searchText;
    const queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    if (tags && tags.length > 0) {
      queryParams['tags'] = tags;
    }

    this.routeParams = queryParams;
    this.router.navigate(['.'], { queryParams: this.routeParams });

    this.data.getQuestions(tags).subscribe((questions) => {
      this.questions$ = questions;
    });
  }

}
