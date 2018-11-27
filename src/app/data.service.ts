import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getQuestions(tags) {
    return this.http.get(`https://api.stackexchange.com/2.2/questions?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity${tags.length > 0 ? `&tagged=${tags}` : ''}&filter=default`);
  }

  getAnswers(questionId) {
    return this.http.get(`https://api.stackexchange.com/2.2/questions/${questionId}/answers?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&filter=default`);
  }
}
