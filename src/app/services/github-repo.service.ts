import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class GithubRepoService {
  constructor(private apollo: Apollo) {}

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
}
