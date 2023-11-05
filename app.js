import { makeGraphQLQuery } from  "./graphqlClient.js";

const userQuery = `
{
    user {
      id
      login
      xps {
        amount
        path
      }
      auditRatio
    }
  }
`;

makeGraphQLQuery(userQuery)
  .then(data => {
    console.log('GraphQL Data:', data);
    const userData = data.data.user;
    const xps = userData[0].xps;
    const totalXp = xps.reduce((sum, xp) => sum + xp.amount, 0);
    console.log("xp:", totalXp);
    console.log("auditRatio:", userData[0].auditRatio);

    const svgXp = document.getElementById("xpChartContainer");
    const chartWidth = parseInt(
      getComputedStyle(svgXp).getPropertyValue("width"),
      10
    );
    const chartHeight = parseInt(
      getComputedStyle(svgXp).getPropertyValue("height"),
      10
    );

    svgXp.innerHTML = "";

    const barWidth = chartWidth / xps.length;

    xps.forEach((xp, index) => {
      const barHeight = (xp.amount / totalXp) * chartHeight;
      const x = index * barWidth;
      const y = chartHeight - barHeight;

      const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bar.setAttribute("x", x);
      bar.setAttribute("y", y);
      bar.setAttribute("width", barWidth);
      bar.setAttribute("height", barHeight);
      bar.setAttribute("fill", "blue");
      bar.setAttribute("data-path", xp.path);

      const tooltip = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "title"
      );
      tooltip.textContent = `XP: ${xp.amount}`;
      bar.appendChild(tooltip);

      const xpText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      xpText.setAttribute("x", x + barWidth / 2);
      xpText.setAttribute("y", y - 5);
      xpText.setAttribute("text-anchor", "middle");
      xpText.textContent = xp.path;

      svgXp.appendChild(bar);
      svgXp.appendChild(xpText);
    });
  })
  .catch(error => {
    console.error('Failed to fetch user data:', error);
  });
