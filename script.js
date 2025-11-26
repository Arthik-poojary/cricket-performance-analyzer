let players = [];

function calculateStrikeRate(runs, balls) {
  return balls === 0 ? 0 : ((runs / balls) * 100).toFixed(2);
}

document.getElementById("player-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("player-name").value;
  const team = document.getElementById("team").value;
  const runs = parseInt(document.getElementById("runs").value);
  const balls = parseInt(document.getElementById("balls").value);
  const fours = parseInt(document.getElementById("fours").value);
  const sixes = parseInt(document.getElementById("sixes").value);
  const format = document.getElementById("match-type").value;

  const strikeRate = calculateStrikeRate(runs, balls);

  players.push({ name, team, runs, balls, fours, sixes, format, strikeRate });
  updateDashboard();
  updateTable();
});

function updateDashboard() {
  let totalRuns = 0, totalSR = 0, totalBoundaries = 0;
  players.forEach(p => {
    totalRuns += p.runs;
    totalSR += parseFloat(p.strikeRate);
    totalBoundaries += p.fours + p.sixes;
  });
  document.getElementById("total-players").textContent = players.length;
  document.getElementById("total-runs").textContent = totalRuns;
  document.getElementById("avg-strike-rate").textContent = players.length ? (totalSR / players.length).toFixed(2) : 0;
  document.getElementById("total-boundaries").textContent = totalBoundaries;
}

function updateTable() {
  const tbody = document.getElementById("scorecard-body");
  tbody.innerHTML = "";
  players.forEach(p => {
    const row = `<tr>
      <td>${p.name}</td><td>${p.team}</td><td>${p.format}</td>
      <td>${p.runs}</td><td>${p.balls}</td><td>${p.fours}</td><td>${p.sixes}</td><td>${p.strikeRate}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}
