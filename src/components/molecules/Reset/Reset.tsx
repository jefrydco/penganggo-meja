import { Button, ButtonProps } from "@mui/material";
import React from "react";

export interface ResetProps {
  onClick?: ButtonProps['onClick']
}

export const Reset: React.FC<ResetProps> = ({ onClick }) => {
  return <Button role="button" variant="contained" onClick={onClick}>Reset</Button>
};
