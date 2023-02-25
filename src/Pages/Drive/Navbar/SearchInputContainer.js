import React, { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import TextField from "@mui/material/TextField";
import { debounce } from "../../../utils/generic";
import { subscribe } from "../../../utils/pubsub";
import { PUBSUB_EVENTS } from "../../../constants";
import { SEARCH_INPUT_STYLE } from "../styles";

const SearchInputContainer = ({ onChange, size, onDebouncedChange }) => {
  const [value, setValue] = useState("");

  const handleTextInputOnChange = (event) => {
    onChange?.(event.target.value);
    setValue(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnChangeData = useCallback(
    debounce((value) => onDebouncedChange(value), 500),
    []
  );

  useEffect(() => {
    debounceOnChangeData(value);
  }, [value, debounceOnChangeData]);

  useEffect(() => {
    subscribe(PUBSUB_EVENTS.CLEAR_SEARCH_TERM, () => setValue(""));
  }, []);

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={value}
      size={size}
      sx={SEARCH_INPUT_STYLE}
      color="primary"
      onChange={handleTextInputOnChange}
    />
  );
};

SearchInputContainer.propTypes = {
  size: string,
  onChange: func,
  onDebouncedChange: func,
};

SearchInputContainer.defaultProps = {
  size: "small",
  onChange: () => null,
  onDebouncedChange: () => null,
};

export default SearchInputContainer;
