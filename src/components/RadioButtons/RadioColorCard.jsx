import { Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const RadioColorCard = ({ click }) => {
  const radio = [
    {
      value: "Low",
      radioColor: {
        static: "var(--color-blue)",
        checked: "var(--datepicker-checked)",
      },
    },
    {
      value: "Medium",
      radioColor: {
        static: "var(--color-pink)",
        checked: "var(--datepicker-checked)",
      },
    },
    {
      value: "High",
      radioColor: {
        static: "var(--color-green)",
        checked: "var(--datepicker-checked)",
        additional: "var(--datepicker-checked)",
      },
    },
    {
      value: "Without",
      radioColor: {
        static: "var(--datepicker-grey-lable)",
        checked: "var(--datepicker-checked)",
      },
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100px",
      }}
    >
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        // defaultValue={currentPriority}
        name="radio-buttons-group"
        onChange={(evt) => click(evt.target.value)}
        sx={{ display: "flex", gap: "8px" }}
        row
      >
        {radio.map((button) => {
          const { value, radioColor } = button;
          return (
            <FormControlLabel
              key={value}
              value={value}
              sx={{ margin: "0", "& span": { padding: 0 } }}
              control={
                <Radio
                  sx={{
                    color: "transparent",
                    backgroundColor: radioColor.static,
                    width: "14px",
                    height: "14px",
                    "&.Mui-checked": {
                      color: radioColor.static,
                      backgroundColor: radioColor.checked,
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 18,
                    },
                  }}
                  disableRipple
                />
              }
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default RadioColorCard;
