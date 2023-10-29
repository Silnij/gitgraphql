import { makeGraphQLQuery } from  "./graphqlClient.js";

const userQuery = `
{
    user {
      id
      login
      xps {
        userId
        amount
        path
      }
    }
    audit {
      auditorId
      grade
    }
  }
`;

makeGraphQLQuery(userQuery)
    .then(data => {
        console.log('GraphQL Data:', data);
        const userData = data.data.user;
        updateProfileWithData(userData);
    })
    .catch(error => {
        console.error('Failed to fetch user data:', error);
    });

    function updateProfileWithData(userData) {
        const userNameElement = document.getElementById('user-name');
        const userXpElement = document.getElementById('user-xp');
        const userAuditsElement = document.getElementById('user-audits');

        userNameElement.textContent = userData.login;
        userXpElement.textContent = userData.xps;
        userAuditsElement.textContent = userData.audit;
    }
    