import gql from 'graphql-tag';

export const getRepos = gql `
query getRepositories($repoFirst: Int, $repoName: String!){
  search(
    type:REPOSITORY, 
    query: $repoName,
    first: $repoFirst
  ) {
    repos: edges {
      repo: node {
        ... on Repository{
          id
          url
          name
          description
          isPrivate
          licenseInfo{
            name
          }
          owner {
            login
            avatarUrl
            url
          }
          
          latestRelease {
            createdAt
            updatedAt
          }
				}
      }
    }

  }
}
`