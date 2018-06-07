import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import "rxjs/add/operator/map";
import {Http} from '@angular/http'
@Injectable({
  providedIn: "root"
})
export class GithubRepoService {
  constructor(private apollo: Apollo,private http:Http) {}

  getRepoInfo(name?: string) {
    const QUERY = gql`
      query QUERY {
        search(query: "name:''", type: REPOSITORY, first: 30) {
          nodes {
            ... on Repository {
              name
              owner {
                avatarUrl
              }
              dependencyGraphManifests(first: 30) {
                nodes {
                  dependencies(first: 30) {
                    nodes {
                      requirements
                      packageName
                      packageManager
                    }
                  }
                }
              }
              vulnerabilityAlerts(first: 30){
                nodes{
                  packageName
                }

            }
            }
          }
        }
      }
    `;

    return this.apollo
      .query({
        query: QUERY,
      }).map(data => {
        const nodes = (<any>data.data).search.nodes;
        const repos = nodes.map(node => {
          return {
            name: node.name,
            avatarUrl: node.owner.avatarUrl,
            dependencies: node.dependencyGraphManifests.nodes.map(
              t => t.dependencies.nodes
            ),
            vulnerabilities:node.vulnerabilityAlerts.nodes
          };
        });

        console.log(repos);
        return repos;
      });
  }

  searchByUser(userName){

    console.log(userName)
    const QUERY = gql`
    query QUERY {
      user(login:"${userName}"){
        repositories(first:30){
          nodes{
            name
            owner {
              avatarUrl
            }
            dependencyGraphManifests(first: 30) {
              nodes {
                dependencies(first: 30) {
                  nodes {
                    requirements
                    packageName
                    packageManager
                  }
                }
              }
            }
            vulnerabilityAlerts(first: 30){
                nodes{
                  packageName
                }

            }
          }
        }
      }
    }
  `;

  return this.apollo
    .query({
      query: QUERY,
    }).map(data => {
      console.log(data)
      const nodes = (<any>data.data).user.repositories.nodes;
      const repos = nodes.map(node => {
        return {
          name: node.name,
          avatarUrl: node.owner.avatarUrl,
          dependencies: node.dependencyGraphManifests.nodes.map(
            t => t.dependencies.nodes
          ),
          vulnerabilities:node.vulnerabilityAlerts.nodes
        };
      });

      console.log(repos);
      return repos;
    });
  }

  getAllPublicRepos(){
	const url = "https://api.github.com/repositories"
	return this.http.get(url).map(t=>t.json().map(this.mapToGitObj));
  }
  
  getUserRepos(userName:string){
	  if(!userName)
	  {
		  return this.getAllPublicRepos();
	  }
	const url = `https://api.github.com/users/${userName}/repos`
	return this.http.get(url).map(t=>t.json().map(this.mapToGitObj));
  }
  
  getDependencies(gitObj){
	  return new Promise<any>((res,rej)=>{
	  const url = `https://api.github.com/repos/${gitObj.userName}/${gitObj.name}/contents/package.json`
	   this.http.get(url).map(t=>t.json()).subscribe((data)=>{
			const contents = data.content.replace(/\n/g, "\n");
			const packageObj = JSON.parse(atob(contents));
			const dependencies = packageObj.dependencies;
			res(dependencies)
		},(err)=>rej())
	  })
  }
  
  mapToGitObj(obj){
	  return {
			name:obj.name,
			avatarUrl:obj.owner.avatar_url,
			userName:obj.owner.login
		}
	  
  }
}
