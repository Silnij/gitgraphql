import { makeGraphQLQuery } from "./graphqlClient.js";

function fetchMyData(){
const userQuery = `{
    user(where: { id: { _eq: 3242 }}) {
      login
      auditRatio
    }
  }`

  return makeGraphQLQuery(userQuery)
    .then(data => {
      //console.log('GraphQL my Data:', data);
      const userData = data.data.user;
      const myData = userData[0];
      const meContainer = document.getElementById("meContainer");
      const meChart = document.getElementById("me");
      //console.log("myData:", myData);
        
        const {login, auditRatio} = me;
        

        function handleMouseover(event) {
            const target = event.target;
            const bars = document.querySelectorAll('.meContainer rect');
          
            bars.forEach(bar => {
              if (bar === target) {
                bar.setAttribute('fill', 'blue');
              } else {
                bar.setAttribute('fill', 'grey');
              }
            });
          }

        const chartWidth = parseInt(getComputedStyle(meContainer).getPropertyValue("width"), 10);
        const chartHeight = parseInt(getComputedStyle(meContainer).getPropertyValue("height"), 10);
        const barWidth = 500;  
        const barHeight = 200;
        const x = barWidth
        const y = chartHeight - barHeight

        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "grey");
        bar.setAttribute("data-login", login);
        bar.setAttribute("data-auditRatio", auditRatio);
        bar.setAttribute("x", x);
        bar.setAttribute("y", y);

        meChart.appendChild(bar);
        

        const tooltip = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "title"
          );
          tooltip.textContent = `Login: ${myData.login}, Audit Ratio: ${myData.auditRatio}`;
        bar.appendChild(tooltip);
        
        bar.addEventListener("mouseover", handleMouseover);

        bar.addEventListener("mouseout", () => {
          tooltip.style.display = "none";
        });

    })
    .catch(error => {
        console.error('Failed to fetch my data:', error);
      });

}

export {fetchMyData};