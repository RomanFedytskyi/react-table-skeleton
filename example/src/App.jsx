import React, { useState } from "react";
import { TableSkeletonBody } from "react-table-skeleton";

export default function App() {
  const [loading, setLoading] = useState(true);
  const data = [
    { name: "Alice", age: 30, city: "NY" },
    { name: "Bob", age: 25, city: "LA" },
    { name: "Cara", age: 28, city: "SF" },
  ];

  return (
    <div className="example-root">
      <h1>react-table-skeleton — demo</h1>
      <p>
        <button onClick={() => setLoading((v) => !v)}>
          {loading ? "Show Real Data" : "Show Skeleton"}
        </button>
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
