import { GithubRepoService } from "src/app/services/github-repo.service";
import { Component, OnInit } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-listofrepo",
  templateUrl: "./listofrepo.component.html",
  styleUrls: ["./listofrepo.component.css"]
})
export class ListofrepoComponent implements OnInit {
  displayedColumns = ["avatar", "name"];
  dataSource: MatTableDataSource<any>;
  loaded: boolean = false;
  showDependency = false;
  repo;
  constructor(private githubRepoService: GithubRepoService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.githubRepoService.getRepoInfo().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.loaded = true;
    });
  }

  showDependencies(repo) {
    this.showDependency = true;
    this.repo = repo;
  }

  hideDependencies() {
    this.showDependency = false;
  }

  searchByUser(userName) {
    this.githubRepoService
      .searchByUser(userName)
      .subscribe(data => (this.dataSource.data = data));
  }
}
