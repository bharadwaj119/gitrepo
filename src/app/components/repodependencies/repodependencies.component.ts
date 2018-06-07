import { Component, OnInit } from "@angular/core";
import { GithubRepoService } from "src/app/services/github-repo.service";
import { Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { ViewChild } from "@angular/core";
import { retry } from "async";

@Component({
  selector: "app-repodependencies",
  templateUrl: "./repodependencies.component.html",
  styleUrls: ["./repodependencies.component.css"]
})
export class RepodependenciesComponent implements OnInit {
  @Input() repo;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ["name", "version"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading=true;
  constructor(private githubRepoService: GithubRepoService) {
	  
  }

  ngOnInit() {
	 let dependencies = [];
	this.githubRepoService.getDependencies(this.repo).then((d)=>{
		Object.keys(d).forEach(function(k){
			dependencies.push({
				packageName: k,
				requirements: d[k],
			});
		});
		this.loading=false;
	}).catch(()=>this.loading=false);
	
    this.dataSource = new MatTableDataSource(dependencies);
	setTimeout(()=>this.dataSource.paginator = this.paginator)
  }
}
