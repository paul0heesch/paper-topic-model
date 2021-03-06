import { Component, OnInit } from '@angular/core';
import { Paper } from '../paper';
import { PaperService } from '../paper.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit {
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50];
  papers: Paper[];
  papersInPage: Paper[];

  constructor(private paperService: PaperService) {}

  getPapers(): void {
    this.paperService.getPapers().subscribe((paperList: Paper[]) => {
      this.papers = paperList;
      this.length = this.papers.length;
      this.papersInPage = this.papers.slice(0, this.pageSize);
    });
  }

  ngOnInit() {
    this.getPapers();
  }

  pageEvent(event: PageEvent): void {
    // console.log(event.pageIndex, event.length, event.pageSize);
    let startIndex: number, endIndex: number;
    startIndex = event.pageIndex * event.pageSize;
    endIndex = Math.min(startIndex + event.pageSize, event.length);
    if (endIndex - startIndex < event.pageSize) {
      startIndex = endIndex - event.pageSize;
    }
    this.papersInPage = this.papers.slice(startIndex, endIndex);
  }
}
