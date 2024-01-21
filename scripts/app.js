import { fetchAuditsData } from "./audits.js";
import { fetchMyData } from "./me.js";
import { fetchXpData } from "./xp.js";


document.addEventListener("DOMContentLoaded", () => {

  const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem('jwt');
        window.location.href = 'index.html';
    });

  fetchXpData();
  fetchAuditsData();
  fetchMyData();

    });
