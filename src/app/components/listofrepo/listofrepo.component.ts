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
  displayedColumns = ["avatar", "name","username"];
  dataSource: MatTableDataSource<any>;
  loaded: boolean = false;
  showDependency = false;
  repo;
  userName:string = ""
  constructor(private githubRepoService: GithubRepoService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
	  this.githubRepoService.getAllPublicRepos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
	  setTimeout(()=>this.dataSource.paginator = this.paginator)
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
	  this.userName =userName;
    this.githubRepoService
      .getUserRepos(this.userName)
      .subscribe(data => (this.dataSource.data = data));
  }
}
