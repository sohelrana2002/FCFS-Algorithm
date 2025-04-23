import { useState } from "react";

function App() {
  const [processes, setProcesses] = useState([]);
  const [newProcess, setNewProcess] = useState({
    id: "",
    arrival: "",
    burst: "",
  });

  const handleAddProcess = () => {
    setProcesses([
      ...processes,
      {
        ...newProcess,
        arrival: parseInt(newProcess.arrival),
        burst: parseInt(newProcess.burst),
      },
    ]);
    setNewProcess({ id: "", arrival: "", burst: "" });
  };

  const calculateFCFS = () => {
    let currentTime = 0;
    let totalWT = 0;

    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
    const result = sorted.map((proc) => {
      const startTime = Math.max(currentTime, proc.arrival);
      const completionTime = startTime + proc.burst;
      const turnaroundTime = completionTime - proc.arrival;
      const waitingTime = turnaroundTime - proc.burst;

      currentTime = completionTime;
      totalWT += waitingTime;

      return {
        ...proc,
        completionTime,
        turnaroundTime,
        waitingTime,
      };
    });

    const avgWT = (totalWT / result.length).toFixed(2);

    return { result, avgWT };
  };

  const { result: results, avgWT } = calculateFCFS();

  return (
    <div className="p-4 max-w-xl mx-auto pt-10">
      <h1 className="text-xl font-bold mb-4">FCFS Scheduling</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Process"
          value={newProcess.id}
          onChange={(e) => setNewProcess({ ...newProcess, id: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Arrival Time"
          value={newProcess.arrival}
          onChange={(e) =>
            setNewProcess({ ...newProcess, arrival: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Burst Time"
          value={newProcess.burst}
          onChange={(e) =>
            setNewProcess({ ...newProcess, burst: e.target.value })
          }
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddProcess}
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
        >
          Add
        </button>
      </div>

      {results.length > 0 && (
        <>
          <table className="w-full border-collapse border text-sm mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Process</th>
                <th className="border p-2">Arrival T</th>
                <th className="border p-2">Burst T</th>
                <th className="border p-2">Completion T</th>
                <th className="border p-2">Turn Around T</th>
                <th className="border p-2">Waiting T</th>
              </tr>
            </thead>
            <tbody>
              {results.map((p, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2">{p.arrival}</td>
                  <td className="border p-2">{p.burst}</td>
                  <td className="border p-2">{p.completionTime}</td>
                  <td className="border p-2">{p.turnaroundTime}</td>
                  <td className="border p-2">{p.waitingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center font-semibold">
            <p>Average Waiting Time: {avgWT}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
