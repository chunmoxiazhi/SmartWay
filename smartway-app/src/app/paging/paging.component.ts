import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
const perPage = 20;
@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  @Input() page;
  @Output() newPage = new EventEmitter();

  previousPage() {
    if (this.page > 1) {
      this.newPage.emit(this.page - 1);
    }
    else{
      console.log("Page 1 reached.");
    }
  }

  nextPage() {
    if (this.page < perPage) {
      this.newPage.emit(this.page + 1);
    }
    else{
      console.log("Page 6 reached.");
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
