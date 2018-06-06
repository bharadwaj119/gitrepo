import { TestBed, inject } from '@angular/core/testing';

import { GithubRepoService } from './github-repo.service';

describe('GithubRepoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubRepoService]
    });
  });

  it('should be created', inject([GithubRepoService], (service: GithubRepoService) => {
    expect(service).toBeTruthy();
  }));
});
