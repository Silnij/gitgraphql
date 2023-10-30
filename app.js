import { makeGraphQLQuery } from  "./graphqlClient.js";

const userQuery = `
{
    user {
      id
      login
      xps {
        amount
      }
    }
  }
`;



makeGraphQLQuery(userQuery)
    .then(data => {
        console.log('GraphQL Data:', data);
        const userData = data.data.user;
        console.log("userData:", userData);
        const xps = userData.xps
        console.log("userDataXps:", xps);
        const totalXp = xps.reduce ((sum, xp) => sum + xp.amount, 0);
        console.log("xp:", totalXp);
        //console.log("auditRatio:", auditRatio);
        updateProfileWithData(userData);
    })
    .catch(error => {
        console.error('Failed to fetch user data:', error);
    });

    function updateProfileWithData(userData) {
        const userNameElement = document.getElementById('user-name');
        const userXpElement = document.getElementById('user-xp');
        //const userAuditsElement = document.getElementById('user-audits');

        userNameElement.textContent = userData.login;
        userXpElement.textContent = totalXp;
      //  userAuditsElement.textContent = userData.auditRatio;
    }
    