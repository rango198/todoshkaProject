import { Box, FormControlLabel, RadioGroup, Radio,  } from "@mui/material";

const RadioFilter = ({ onFilterChange }) => {
  const radio = [
    {
      value: "Without",
      label: "Without priority",
      labelColor: "var(--color-icon-grey)",
      radioColor: {
        static: "rgba(255, 255, 255, 0.5)",
        onChecked: "rgba(22, 22, 22, 0.3)",
      },
    },
    {
      value: "Low",
      label: "Low",
      labelColor: "var(--color-icon-grey)",
      radioColor: {
        static: "var(--color-blue)",
        onChecked: "var(--bg-color-form)",
      },
    },
    {
      value: "Medium",
      label: "Medium",
      labelColor: "var(--color-icon-grey)",
      radioColor: {
        static: "var(--color-pink);",
        onChecked: "var(--bg-color-form)",
      },
    },
    {
      value: "High",
      label: "High",
      labelColor: "var(--color-icon-grey)",
      radioColor: {
        static: "var(--color-green)",
        onChecked: "var(--bg-color-form)",
      },
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flexStart",
        width: "120px",
      }}
    >
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="colorFilter"
        name="radio-buttons-group"
        onChange={(evt) => {
          onFilterChange(evt.target.value);
        }}
        sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
      >
        {radio.map((button) => {
          const { value, label, labelColor, radioColor } = button;
          return (
            <FormControlLabel
              key={value}
              value={value}
              sx={{
                display: "flex",
                gap: "8px",
                margin: "0",
                height: "24px",
                "&.MuiTypography-root": {
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  color: labelColor,
                },
              }}
              control={
                <Radio
                  sx={{
                    width: "14px",
                    height: "14px",
                    color: "transparent",
                    backgroundColor: radioColor.static,
                    "&.Mui-checked": {
                      color: radioColor.static,
                      backgroundColor: radioColor.onChecked,
                    },
                  }}
                  disableRipple
                />
              }
              label={label}
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default RadioFilter;
