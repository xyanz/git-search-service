import { Injectable } from '@angular/core';
import { UnifiedSearch } from './unified-search';
import { Observable } from 'rxjs/Observable';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import { GitSearch } from './git-search';
import { GitCodeSearch } from './git-code-search';
import 'rxjs/add/observable/forkJoin'; //Allows calling of multiple observables at once
import 'rxjs/add/operator/map';


@Injectable()
export class UnifiedSearchService {

  constructor(
    private searchService : GitSearchService,
    private codeSearchService : GitCodeSearchService
  ) { }
   
//TODO: Switch the UnifiedSearch's operator to use the concat operator instead of the forkJoin operator. 
//Observe the difference in the call stack in the Network tab of your browser. Try reversing the order 
//in which the APIs are called as well.

//TODO: Switch the UnifiedSearch's operator to use the combineLatest operator instead of the forkJoin operator. 
//Observe the difference in the call stack in the Network tab of your browser. Try reversing the order in which 
//the APIs are called as well.


  //forkJoin waits for response from both Observables, then emits them both as single array containing both responses.
  unifiedSearch : Function = (query: string) : Observable<UnifiedSearch> => {
    return Observable.forkJoin(this.searchService.gitSearch(query), this.codeSearchService.codeSearch(query))
    //construct observable object with both responses mapped to own property
    .map( (response : [GitSearch, GitCodeSearch]) => {
      return {
        'repositories' : response[0],
        'code' : response[1]
      }
    })
  }
}
