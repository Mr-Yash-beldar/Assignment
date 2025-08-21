import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, Column } from "./";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@test.com", age: 24 },
  { id: 2, name: "Bob", email: "bob@test.com", age: 30 },
  { id: 3, name: "Carol", email: "carol@test.com", age: 27 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Basic: Story = {
  render: () => <DataTable<User> data={sampleData} columns={columns} />,
};

export const Loading: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} loading />,
};

export const Empty: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} />,
};

export const Selectable: Story = {
  render: () => {
    const [sel, setSel] = useState<User[]>([]);
    return (
      <div style={{ width: 600 }}>
        <DataTable<User>
          data={sampleData}
          columns={columns}
          selectable
          onRowSelect={setSel}
        />
        <p className="mt-4 text-sm">
          Selected: {sel.map((u) => u.name).join(", ")}
        </p>
      </div>
    );
  },
};
