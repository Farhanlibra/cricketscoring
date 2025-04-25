import React, { useState } from "react";

function App() {
  const [runs, setRuns] = useState(0);
  const [balls, setBalls] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [batsmen, setBatsmen] = useState([
    { name: "", runs: 0 },
    { name: "", runs: 0 }
  ]);
  const [strikerIndex, setStrikerIndex] = useState(0);
  const [bowler, setBowler] = useState("");

  const handleRun = (run) => {
    setRuns((prev) => prev + run);
    setBalls((prev) => prev + 1);

    // Update striker's score
    const updatedBatsmen = [...batsmen];
    updatedBatsmen[strikerIndex].runs += run;
    setBatsmen(updatedBatsmen);

    // Rotate strike on odd run
    if (run % 2 !== 0) {
      setStrikerIndex((prev) => 1 - prev);
    }
  };

  const handleWicket = () => {
    setWickets((prev) => prev + 1);
    setBalls((prev) => prev + 1);

    // Replace the out batsman with a new name
    const updated = [...batsmen];
    const newName = prompt("Enter new batsman name:");
    updated[strikerIndex] = { name: newName || `Batsman ${wickets + 3}`, runs: 0 };
    setBatsmen(updated);
  };

  const handleWide = () => {
    setRuns((prev) => prev + 1);
  };

  const handleNoBall = () => {
    setRuns((prev) => prev + 1);
  };

  const formatOvers = () => {
    const over = Math.floor(balls / 6);
    const ball = balls % 6;
    return `${over}.${ball}`;
  };

  const handleBatsmanNameChange = (index, value) => {
    const updated = [...batsmen];
    updated[index].name = value;
    setBatsmen(updated);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Cricket Score Tracker</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Batsman 1:{" "}
          <input
            type="text"
            value={batsmen[0].name}
            onChange={(e) => handleBatsmanNameChange(0, e.target.value)}
          />
          <br/>
        </label>{" "}
        <label>
          Batsman 2:{" "}
          <input
            type="text"
            value={batsmen[1].name}
            onChange={(e) => handleBatsmanNameChange(1, e.target.value)}
          />
          <br/>
        </label>{" "}
        <label>
          Bowler:{" "}
          <input
            type="text"
            value={bowler}
            onChange={(e) => setBowler(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <strong style={{fontSize:50}}>Score:</strong> <span style={{fontSize:80}}> {runs}/{wickets} </span> (<span style={{fontSize:80}}>{formatOvers()}</span> overs )
        <br />
        <strong>Batting:</strong>
        <ul>
          <li>
            {batsmen[0].name || "Batsman 1"} – {batsmen[0].runs}{" "}
            {strikerIndex === 0 && "(striker)"}
          </li>
          <li>
            {batsmen[1].name || "Batsman 2"} – {batsmen[1].runs}{" "}
            {strikerIndex === 1 && "(striker)"}
          </li>
        </ul>
        <strong>Bowler:</strong> {bowler}
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {[0, 1, 2, 3, 4, 6].map((r) => (
          <button key={r} onClick={() => handleRun(r)}>
            {r} Run{r !== 1 ? "s" : ""}
          </button>
        ))}
        <button onClick={handleWicket}>Wicket</button>
        <button onClick={handleWide}>Wide</button>
        <button onClick={handleNoBall}>No Ball</button>
      </div>
    </div>
  );
}

export default App;
