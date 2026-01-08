import React, { useState } from "react";
import { TableSkeletonBody } from "react-table-skeleton";
import "react-table-skeleton/dist/index.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("default");
  const data = [
    { name: "Alice", age: 30, city: "NY" },
    { name: "Bob", age: 25, city: "LA" },
    { name: "Cara", age: 28, city: "SF" },
  ];

  const themeConfigs = {
    default: {},
    dark: {
      backgroundColor: "#374151",
      shimmerColor: "rgba(156, 163, 175, 0.2)",
      barHeight: 16,
      barBorderRadius: 6,
    },
    custom: {
      backgroundColor: "#1e293b",
      shimmerColor: "rgba(148, 163, 184, 0.3)",
      barHeight: 18,
      barBorderRadius: 8,
    },
  };

  return (
    <div className="example-root">
      <h1>react-table-skeleton — demo</h1>
      <p>
        <button onClick={() => setLoading((v) => !v)}>
          {loading ? "Show Real Data" : "Show Skeleton"}
        </button>
        {" | "}
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="default">Default Theme</option>
          <option value="dark">Dark Theme</option>
          <option value="custom">Custom Theme</option>
        </select>
      </p>

      <table className="demo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        {loading ? (
          <TableSkeletonBody
            rows={4}
            columns={3}
            shimmer={true}
            randomize={true}
            {...themeConfigs[theme]}
          />
        ) : (
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.age}</td>
                <td>{d.city}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
