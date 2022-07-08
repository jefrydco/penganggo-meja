import { GENDER_LIST } from "@/constants/gender";
import { GenderEnum } from "@/interfaces/user";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export interface GenderProps {
  reset?: boolean
  onGenderChange?: ((gender: GenderEnum) => void) | undefined;
}

export const Gender: React.FC<GenderProps> = ({ reset, onGenderChange }) => {
  const [gender, setGender] = useState<GenderEnum>(GenderEnum.FEMALE);
  const handleGenderChange:
    | ((event: SelectChangeEvent<GenderEnum>, child: React.ReactNode) => void)
    | undefined = (event) => {
    const newGender = event.target.value as GenderEnum;
    setGender(newGender);
    onGenderChange && onGenderChange(newGender);
  };
  useEffect(() => {
    if (reset) {
      setGender(GenderEnum.FEMALE)
    }
  }, [reset])
  return (
    <FormControl variant="filled">
      <InputLabel id="gender-label">Gender</InputLabel>
      <Select
        data-testid="gender"
        labelId="gender-label"
        id="gender-select"
        value={gender}
        onChange={handleGenderChange}
      >
        {GENDER_LIST.map((genderItem) => (
          <MenuItem key={genderItem} value={genderItem}>
            {genderItem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
