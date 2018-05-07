import { Component, OnInit } from '@angular/core';
// import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchModel } from '../advanced-search-model';
import { UnifiedSearchService } from '../unified-search.service';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  searchResults: GitSearch;
  searchQuery: string;
  title: string;
  displayQuery: string;
  favorites: Array<number> = [];

  constructor(
    private UnifiedSearchService: UnifiedSearchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  //Instantiate model for user data and create array of keys
  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);

  //On Init
  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query')
      this.gitSearch();
    })
    this.route.data.subscribe((response) => {
      this.title = response.title
    });
  }
  gitSearch = () => {
    this.UnifiedSearchService.unifiedSearch(this.searchQuery).subscribe((response) => {
      console.log("GitSearch component response " + response)
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  checkType = (key) => {
    return typeof key === 'string' ? 'text' : typeof key;
  }

  handleFavorite = (id) => {
    return this.favorites.push(id);
  }

  sendQuery = () => {
    this.searchResults = null;
    let search : string = this.model.q;
    let params : string = "";
    //convert to string based key:value parameter for github API query
    this.modelKeys.forEach( (elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.model[elem]) {
        params += '+' + elem + ':' + this.model[elem];
      }
    })
    this.searchQuery = search;
    if (params !== ''){
      this.searchQuery = search + '+' + params;
    }
    this.displayQuery = this.searchQuery;
    this.gitSearch();
    // this.router.navigate(['/search/' + this.searchQuery]);
  }
}
