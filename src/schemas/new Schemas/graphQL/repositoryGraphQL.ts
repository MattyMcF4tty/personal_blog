const repositoryGraphQL = `
  id
  name
  url
  description
  createdAt
  updatedAt
  watchers (first: 10) {
    totalCount
    users: edges {
      user: node {
        login
        avatarUrl
        url
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
  }
  collaborators (first: 10){
    totalCount
    users: edges {
        user: node {
          login
          avatarUrl
          url
        }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
  }
  repositoryTopics (first: 10) {
    totalCount
    topics: edges {
      node {
        topic {
          name
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
  }
  languages (first: 10) {
    languages: nodes {
      name
    }
  }
  defaultBranchRef{
    target{
      ... on Commit{
        history(first:10){
          totalCount
          commits: edges{
            commit: node{
              ... on Commit{
                message
                committedDate
                url
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
        }
      }
    }
}`;

export default repositoryGraphQL;
