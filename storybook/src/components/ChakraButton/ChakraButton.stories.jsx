import { Button } from "@chakra-ui/react";

export default {
  title: "Chakra/Button",
  component: Button,
  argTypes: {
    colorPalette: { control: "text" },
    children: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export const Success = {
  args: {
    colorPalette: "green",
    children: "Success",
  },
};

export const Danger = {
  args: {
    colorPalette: "red",
    children: "Danger",
  },
};
