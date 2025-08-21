import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <div style={{ width: 420 }}>
        <InputField
          label="Email"
          placeholder="you@domain.com"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          helperText="We will not share your email."
          clearable
          variant="outlined"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [c, setC] = useState("");
    return (
      <div className="space-y-4" style={{ width: 520 }}>
        <InputField
          label="Filled"
          value={a}
          onChange={(e) => setA(e.target.value)}
          variant="filled"
          helperText="filled variant"
        />
        <InputField
          label="Outlined"
          value={b}
          onChange={(e) => setB(e.target.value)}
          variant="outlined"
          helperText="outlined variant"
        />
        <InputField
          label="Ghost"
          value={c}
          onChange={(e) => setC(e.target.value)}
          variant="ghost"
          helperText="ghost variant"
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [s, setS] = useState("");
    const [m, setM] = useState("");
    const [l, setL] = useState("");
    return (
      <div className="space-y-4" style={{ width: 420 }}>
        <InputField
          label="Small"
          value={s}
          onChange={(e) => setS(e.target.value)}
          size="sm"
        />
        <InputField
          label="Medium"
          value={m}
          onChange={(e) => setM(e.target.value)}
          size="md"
        />
        <InputField
          label="Large"
          value={l}
          onChange={(e) => setL(e.target.value)}
          size="lg"
        />
      </div>
    );
  },
};

export const PasswordToggle: Story = {
  render: () => {
    const [pw, setPw] = useState("");
    return (
      <div style={{ width: 420 }}>
        <InputField
          label="Password"
          placeholder="Enter password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          type="password"
          showPasswordToggle
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <div style={{ width: 420 }}>
        <InputField
          label="Loading"
          value={v}
          onChange={(e) => setV(e.target.value)}
          loading
          helperText="Loading state example"
        />
      </div>
    );
  },
};
