import Button from ".";

export default {
  title: "Button",
  component: Button,
};

export const Primary = {
  args: { children: "Botón", disabled: false },
  title: "Button",
  component: Button,
};

export const Secondary = {
  args: { secondary: true, children: "Botón", disabled: false },
  title: "Button",
  component: Button,
};

export const CallToAction = {
  args: { cta: true, children: "Botón", disabled: false },
  title: "Button",
  component: Button,
};

export const Danger = {
  args: { danger: true, children: "Botón", disabled: false },
  title: "Button",
  component: Button,
};
