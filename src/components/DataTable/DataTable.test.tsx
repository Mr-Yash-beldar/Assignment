import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { DataTable, Column } from "./";

import "@testing-library/jest-dom";

interface Item {
  id: number;
  name: string;
  age: number;
}

const columns: Column<Item>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const data: Item[] = [
  { id: 1, name: "Bob", age: 30 },
  { id: 2, name: "Alice", age: 25 },
];

describe("DataTable", () => {
  it("renders data", () => {
    render(<DataTable<Item> data={data} columns={columns} />);
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(<DataTable<Item> data={[]} columns={columns} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("sorts by column when clicked", async () => {
    const user = userEvent.setup();
    render(<DataTable<Item> data={data} columns={columns} />);
    const col = screen.getByText("Name");
    await user.click(col);
    const rows = screen.getAllByRole("row");
    // header row + 2 data rows
    expect(rows.length).toBe(3);
  });

  it("selects row when checkbox clicked", async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(
      <DataTable<Item>
        data={data}
        columns={columns}
        selectable
        onRowSelect={handle}
      />
    );
    const checkbox = screen.getAllByRole("checkbox")[0];
    await user.click(checkbox);
    expect(handle).toHaveBeenCalled();
  });
});
