import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface IButtonSubmitProps extends ButtonProps {
  isLoading?: boolean;
}

const ButtonSubmit = ({
  children,
  isLoading,
  ...props
}: IButtonSubmitProps) => {
  return (
    <Button type="submit" disabled={isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default ButtonSubmit;
