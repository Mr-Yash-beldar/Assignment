import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { InputField } from "./";

import "@testing-library/jest-dom";

describe("InputField", () => {
  it("renders label and helper text", () => {
    render(
      <InputField
        label="Name"
        helperText="Helpful"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Helpful")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(<InputField label="Email" value="" onChange={handle} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    await user.type(input, "a");
    expect(handle).toHaveBeenCalled();
  });

  it("shows error message when invalid", () => {
    render(
      <InputField
        label="Input"
        invalid
        errorMessage="Error happened"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Error happened")).toBeInTheDocument();
    // role alert for error
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("clear button clears value via onChange", async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(
      <InputField label="Clearable" value="hello" onChange={handle} clearable />
    );
    const btn = screen.getByLabelText("Clear input");
    await user.click(btn);
    expect(handle).toHaveBeenCalled();
  });

  it("password toggle toggles type", async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(
      <InputField
        label="PW"
        value="secret"
        onChange={handle}
        type="password"
        showPasswordToggle
      />
    );
    const toggle = screen.getByLabelText("Show password");
    expect(toggle).toBeInTheDocument();
    await user.click(toggle);
    // Now label should change to Hide password (aria-label toggles)
    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
  });
});
