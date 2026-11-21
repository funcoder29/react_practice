import Input from "./Input";

export default {
  title: "Form/Input",
  component: Input,
};

export const Small = () => <Input type="text" variant="small" />;
export const Medium = () => <Input type="text" variant="medium"></Input>;
export const Large = () => <Input type="text" variant="large"></Input>;
