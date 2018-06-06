import { Component, OnInit } from "@angular/core";
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
  displayedColumns = ["name", "version","vulnerable"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() {}

  ngOnInit() {
    console.log(this.repo);
    let dependencies = [];
    [].concat.apply([], this.repo.dependencies).forEach(element => {
      const isVulnerable =
        this.repo.vulnerabilities.filter(
          t => t.packageName == element.packageName
        ).length > 0;
      dependencies.push({
        packageName: element.packageName,
        requirements: element.requirements,
        isVulnerable: isVulnerable ? "Yes" : "No"
      });
    });

    this.dataSource = new MatTableDataSource(dependencies);

    this.dataSource.paginator = this.paginator;
  }
}
