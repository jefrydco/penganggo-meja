import {
  Box,
  FormControl,
  InputBaseProps,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useDebouncedEffect from "use-debounced-effect";

export interface SearchProps {
  reset?: boolean
  onKeywordChange?: (keyword: string) => void;
}

export const Search: React.FC<SearchProps> = ({ reset, onKeywordChange }) => {
  const [keyword, setKeyword] = useState<string>("");
  const handleChange: InputBaseProps["onChange"] = (event) => {
    setKeyword(event.target.value);
  };
  useEffect(() => {
    if (reset) {
      setKeyword('')
    }
  }, [reset])
  useDebouncedEffect(
    () => {
      onKeywordChange && onKeywordChange(keyword);
    },
    250,
    [keyword]
  );
  return (
    <FormControl>
      <TextField
        variant="filled"
        label="Search"
        value={keyword}
        onChange={handleChange}
      />
    </FormControl>
  );
};
