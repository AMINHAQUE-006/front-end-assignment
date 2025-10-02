import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputField, type InputFieldProps } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["filled", "outlined", "ghost"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  render: (args: InputFieldProps) => {
    const Wrapper = () => {
      const [val, setVal] = useState("");
      return <InputField {...args} value={val} onChange={(e) => setVal(e.target.value)} />;
    };
    return <Wrapper />;
  },
  args: {
    label: "Full name",
    placeholder: "Enter your name",
    helperText: "This will be visible on your profile",
    variant: "outlined",
    size: "md",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@domain.com",
    errorMessage: "Invalid email address",
    variant: "outlined",
  },
};

export const PasswordWithToggle: Story = {
  render: () => {
    const Comp: React.FC = () => {
      const [val, setVal] = useState("");
      return (
        <InputField
          label="Password"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Enter password"
          passwordToggle
          showClear
        />
      );
    };
    return <Comp />;
  },
};
