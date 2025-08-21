import { useState } from "react";
import { InputField, DataTable, Column } from "./components";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const sampleUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@test.com", age: 24 },
  { id: 2, name: "Bob", email: "bob@test.com", age: 30 },
  { id: 3, name: "Carol", email: "carol@test.com", age: 27 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <div className={dark ? "dark min-h-screen" : "min-h-screen"}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <header className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Component Demo</h1>
          <button
            className="px-3 py-1 rounded-xl border border-gray-300 dark:border-gray-700"
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
          >
            Toggle {dark ? "Light" : "Dark"}
          </button>
        </header>

        <main className="p-6 space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-2">InputField Demo</h2>
            <InputField
              label="Email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="We'll keep your email safe."
              clearable
            />
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">DataTable Demo</h2>
            <DataTable<User>
              data={sampleUsers}
              columns={columns}
              selectable
              onRowSelect={setSelected}
            />
            <p className="mt-2 text-sm">
              Selected: {selected.map((u) => u.name).join(", ")}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
