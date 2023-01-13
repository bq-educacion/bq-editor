import Select from ".";

export default {
  title: "atoms/Select",
  component: Select,
};

export const Active = {
  args: {
    options: [
      {
        label: "Label 1",
        value: "label_1",
      },
      {
        label: "Label 2",
        value: "label_2",
      },
    ],
    placeholder: "Select",
  },
  title: "Input",
  component: Select,
};

export const Disabled = {
  args: {
    disabled: true,
    options: [
      {
        label: "Label 1",
        value: "label_1",
      },
      {
        label: "Label 2",
        value: "label_2",
      },
    ],
    placeholder: "Select",
  },
  title: "Select",
  component: Select,
};

export const Error = {
  args: {
    error: true,
    options: [
      {
        label: "Label 1",
        value: "label_1",
      },
      {
        label: "Label 2",
        value: "label_2",
      },
    ],
    placeholder: "Select",
  },
  title: "Select",
  component: Select,
};
