let players = [];

function calculateStrikeRate(runs, balls) {
  return balls === 0 ? 0 : ((runs / balls) * 100).toFixed(2);
}

// Add Player
const form = document.getElementById("player-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("player-name").value.trim();
  const team = document.getElementById("team").value.trim();
  const runs = parseInt(document.getElementById("runs").value);
  const balls = parseInt(document.getElementById("balls").value);
  const fours = parseInt(document.getElementById("fours").value);
  const sixes = parseInt(document.getElementById("sixes").value);
  const format = document.getElementById("match-type").value;

  if (!name || !team || runs < 0 || balls < 0) {
    alert("Enter valid details!");
    return;
  }

  const strikeRate = calculateStrikeRate(runs, balls);

  players.push({ name, team, runs, balls, fours, sixes, format, strikeRate });

  updateDashboard();
  updateTable();
  updateLeaderboard();
  form.reset();
});

// Update Dashboard
function updateDashboard() {
  let totalRuns = 0, totalSR = 0, totalBoundaries = 0;

  players.forEach((p) => {
    totalRuns += p.runs;
    totalSR += parseFloat(p.strikeRate);
    totalBoundaries += p.fours + p.sixes;
  });

  document.getElementById("total-players").textContent = players.length;
  document.getElementById("total-runs").textContent = totalRuns;
  document.getElementById("avg-strike-rate").textContent = players.length
    ? (totalSR / players.length).toFixed(2)
    : 0;
  document.getElementById("total-boundaries").textContent = totalBoundaries;
}

// Update Table
function updateTable() {
  const tbody = document.getElementById("scorecard-body");
  tbody.innerHTML = "";

  players.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td><td>${p.team}</td><td>${p.format}</td>
        <td>${p.runs}</td><td>${p.balls}</td><td>${p.fours}</td><td>${p.sixes}</td><td>${p.strikeRate}</td>
      </tr>
    `;
  });
}

// Update Leaderboard
function updateLeaderboard() {
  const board = document.getElementById("leaderboard-list");
  board.innerHTML = "";

  if (players.length === 0) {
    board.innerHTML = "<p>No players added</p>";
    return;
  }

  const sorted = [...players].sort((a, b) => b.strikeRate - a.strikeRate);

  sorted.forEach((p, i) => {
    board.innerHTML += `<p><strong>${i + 1}. ${p.name}</strong> - SR: ${p.strikeRate}</p>`;
  });
}

// Clear All Button
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => {
  players = [];
  updateDashboard();
  updateTable();
  updateLeaderboard();
});