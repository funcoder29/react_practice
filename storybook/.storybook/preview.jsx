/** @type { import('@storybook/react-vite').Preview } */
import Center from "../src/components/Center/Center";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { withThemeByClassName } from "@storybook/addon-themes";

const preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Center>
          <Story />
        </Center>
      </ChakraProvider>
    ),
    withThemeByClassName({
      defaultTheme: "dark",
      themes: { light: "", dark: "dark" },
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
