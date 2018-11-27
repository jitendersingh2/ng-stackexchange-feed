import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
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
export class AnswersComponent implements OnInit {

  answers$: Array<Object>;
  questionId$: String;
  
  constructor(private data: DataService, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => this.questionId$ = params.id);
  }

  ngOnInit() {
    this.data.getAnswers(this.questionId$).subscribe((answers) => {
      this.answers$ = answers.items;
    })
  }

}
