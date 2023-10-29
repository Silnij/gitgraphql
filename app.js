import { makeGraphQLQuery } from  "./graphqlClient.js";

const userQuery = `
            user {
            id
            login
            xp
            audits
            skills
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
        const userGradesElement = document.getElementById('user-grades');
        const userAuditsElement = document.getElementById('user-audits');
        const userSkillsElement = document.getElementById('user-skills');

        userNameElement.textContent = userData.login;
        userXpElement.textContent = userData.xp;
        userGradesElement.textContent = userData.grades;
        userAuditsElement.textContent = userData.audits;
        userSkillsElement.textContent = userData.skills;
    }
    