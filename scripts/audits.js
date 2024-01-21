// audits.js

import { makeGraphQLQuery } from "./graphqlClient.js";

function fetchAuditsData() {
  const userQuery = `
    {
      user {
        id
        login
        audits {
          group {
            captainLogin
          }
          createdAt
          grade
        }
      }
    }
  `;

  return makeGraphQLQuery(userQuery)
    .then(data => {
      //console.log('GraphQL Data:', data);
      const userData = data.data.user;
      const auditsData = userData[0].audits;
      const auditsContainer = document.getElementById("auditsContainer");
      auditsContainer.style.display = "block";
      const auditsChart = document.getElementById("audits");

      auditsData.forEach((audit, index) => {
        const { grade, group, createdAt } = audit;

        function handleMouseover(event) {
          const target = event.target;
          const bars = document.querySelectorAll('.auditsContainer rect');
        
          bars.forEach(bar => {
            if (bar === target) {
              if (grade === null){
                  bar.setAttribute ('fill', 'red')
              } else {
              bar.setAttribute('fill', 'blue');}
            } else {
              bar.setAttribute('fill', 'grey');
            }
          });
        }
        
        const chartWidth = parseInt(getComputedStyle(auditsContainer).getPropertyValue("width"), 10);
        const chartHeight = parseInt(getComputedStyle(auditsContainer).getPropertyValue("height"), 10);
        const barWidth = 20;  
        const barHeight = grade ? grade * 100 : 30;
        const x = index * barWidth
        const y = chartHeight - barHeight

        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "grey");
        bar.setAttribute("data-captain", group.captainLogin);
        bar.setAttribute("data-time", createdAt);
        bar.setAttribute("x", x);
        bar.setAttribute("y", y);

        auditsChart.appendChild(bar);

        const tooltip = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "title"
        );
        
        const createdAtDate = new Date(createdAt);
        tooltip.textContent = `Captain: ${group.captainLogin}, Date: ${createdAtDate.toLocaleDateString()}, Grade: ${grade !== null ? grade : "Not audited"}`;
        bar.appendChild(tooltip);
        
        bar.addEventListener("mouseover", handleMouseover);

        bar.addEventListener("mouseout", () => {
          tooltip.style.display = "none";
        });
      });
    })
    .catch(error => {
      console.error('Failed to fetch audit data:', error);
    });
}

export { fetchAuditsData };
