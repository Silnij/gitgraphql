import { makeGraphQLQuery } from  "./graphqlClient.js";

const userQuery = `
{
    user {
      id
      login
      xps {
        amount
      }
      auditRatio
    }
  }
`;



makeGraphQLQuery(userQuery)
    .then(data => {
        console.log('GraphQL Data:', data);
        const userData = data.data.user;
        const xps = userData[0].xps
        const totalXp = xps.reduce ((sum, xp) => sum + xp.amount, 0);
        console.log("xp:", totalXp);
        console.log("auditRatio:", userData.auditRatio);
    })
    .catch(error => {
        console.error('Failed to fetch user data:', error);
    });
    