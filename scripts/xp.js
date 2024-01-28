import { makeGraphQLQuery } from  "./graphqlClient.js";
function fetchXpData(){
function showCategory(category) {
    const containers = document.querySelectorAll(".chartContainer");
    containers.forEach(container => {
        container.style.display = "none";
    });
  
    const selectedContainer = document.getElementById(`${category}ChartContainer`);
    selectedContainer.style.display = "block";
  }
  
  function handleMouseover(event) {
    const target = event.target;
    const bars = document.querySelectorAll('.chartContainer rect');
  
    bars.forEach(bar => {
      if (bar === target) {
        bar.setAttribute('fill', 'blue');
      } else {
        bar.setAttribute('fill', 'grey');
      }
    });
  }
  
    
    const categories = [
      'div-01',
      'rust',
      'piscine-js-2-old',
      'piscine-go'
    ];
  
    const userQuery = `
    {
        user {
          id
          login
          xps {
            amount
            path
          }
        }
      }
    `;
  
    return makeGraphQLQuery(userQuery)
      .then(data => {
        //console.log('GraphQL Data:', data);
        const userData = data.data.user;
        const xps = userData[0].xps;
        const totalXp = xps.reduce((sum, xp) => sum + xp.amount, 0);
        //console.log("xp:", totalXp);
  
        const svgContainers = {};
  
        categories.forEach(category => {
          const svgContainer = document.getElementById(`${category}Chart`);
          svgContainer.innerHTML = "";
          svgContainer.style.display = "block";
          svgContainers[category] = svgContainer;
          const button = document.getElementById(`${category}Button`);
          button.addEventListener('click', () => {
          showCategory(category);
      });
        });
  
        xps.forEach((xp, index) => {
          const pathParts = xp.path.split('/');
          let category = 'div-01';
  
          if (pathParts.includes('rust')) {
            category = 'rust';
          } else if (pathParts.includes('piscine-js-2-old')) {
            category = 'piscine-js-2-old';
          } else if (pathParts.includes('piscine-go')){
            category = 'piscine-go'
          }
  
          //console.log("Category:", category)
  
          const svgXp = svgContainers[category];
          const chartWidth = parseInt(getComputedStyle(svgXp).getPropertyValue("width"), 10);
          const chartHeight = parseInt(getComputedStyle(svgXp).getPropertyValue("height"), 10);
  
          const barWidth = (chartWidth / xps.length);
  
          const barHeight = (xp.amount / totalXp) * chartHeight * 6;
          const x = index * barWidth;
          const y = chartHeight - barHeight;
  
          const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          bar.setAttribute("x", x);
          bar.setAttribute("y", y);
          bar.setAttribute("width", barWidth);
          bar.setAttribute("height", barHeight);
          bar.setAttribute("fill", "grey");
          bar.setAttribute("data-path", xp.path);
  
          const taskName = pathParts[pathParts.length - 1];
  
          const tooltip = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "title"
          );
          tooltip.textContent = `XP: ${xp.amount}, Task: ${taskName}`;
          bar.appendChild(tooltip);
          bar.addEventListener("mouseover", handleMouseover);
  
          bar.addEventListener("mouseout", () => {
            tooltip.style.display = "none";
          });
  
          svgXp.appendChild(bar);
        });
  
        showCategory('div-01');
      })
      .catch(error => {
        console.error('Failed to fetch user data:', error);
      });
  };
export {fetchXpData};