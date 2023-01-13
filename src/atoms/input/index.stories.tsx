import Input from ".";

export default {
  title: "atoms/Input",
  component: Input,
};

export const Active = {
  args: { placeholder: "Placeholder" },
  title: "Input",
  component: Input,
};

export const Disabled = {
  args: { disabled: true, placeholder: "Placeholder" },
  title: "Input",
  component: Input,
};

export const Error = {
  args: { error: true, placeholder: "Placeholder" },
  title: "Input",
  component: Input,
};
