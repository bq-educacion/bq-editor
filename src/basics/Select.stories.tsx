import { Select } from '.';

export default {
  title: "Select",
  component: Select
};

export const Default = {
  args: { options: [
    {
      hidden: false,
      label: "Opción 1",
      value: "1"
    },
    {
      hidden: false,
      label: "Opción 2",
      value: "2"
    },
    {
      hidden: false,
      label: "Opción 3",
      value: "3"
    },
    {
      hidden: true,
      label: "Opción 4",
      value: "4"
    }
  ]},
  title: "Select",
  component: Select
};
