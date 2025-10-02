import  { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";
import type { Column } from "../../types/table";

type Person = { id: number; name: string; age: number; email: string };

const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const sample: Person[] = [
  { id: 1, name: "Alice", age: 24, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 31, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => {
    const Comp = () => {
      const [selected, setSelected] = useState<Person[]>([]);
      return (
        <div className="p-4">
          <DataTable
            columns={columns}
            data={sample}
            loading={false}
            selectable
            multipleSelect
            onRowSelect={(rows) => setSelected(rows)}
          />
          <div className="mt-4 text-sm">Selected: {selected.map((s) => s.name).join(", ")}</div>
        </div>
      );
    };
    return <Comp />;
  },
};

export const Loading: Story = {
  render: () => <DataTable columns={columns} data={[]} loading selectable />,
};
