import { useState } from "react";
import InputField from "./components/InputField/InputField";
import DataTable from "./components/DataTable/DataTable";
import type { Column } from "./types/table";

type Person = { id: number; name: string; age: number; email: string };

const people: Person[] = [
  { id: 1, name: "Alice", age: 24, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 31, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
];

const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

function App() {
  const [val, setVal] = useState("");
  const [selected, setSelected] = useState<Person[]>([]);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Demo Components</h1>

      <InputField
        label="Your Name"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Enter name"
        showClear
      />

      <DataTable
        data={people}
        columns={columns}
        selectable
        onRowSelect={(rows) => setSelected(rows)}
      />

      <div className="text-sm mt-4">
        Selected: {selected.map((s) => s.name).join(", ")}
      </div>
    </div>
  );
}

export default App;
