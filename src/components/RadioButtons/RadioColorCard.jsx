import { Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const RadioColorCard = ({ onColorChange, priorityColor }) => {
  const radio = [
 
    {
      value: 'Low',
      radioColor: {
        static: 'var(--color-blue)',
        checked: 'var(--color-light)',
      },
    },
    {
      value: 'Medium',
      radioColor: {
        static: 'var(--color-pink)',
        checked: 'var(--color-light)',
      },
    },
    {
      value: 'High',
      radioColor: {
        static: 'var(--color-green)',
        checked: 'var(--color-light)',
        additional: 'var(--color-light)',
      },
    },
    {
      value: 'Without',
      radioColor: {
        static: 'var(--color-icon-grey)',
        checked: 'var(--color-light)',
      },
    },
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100px',
      }}
    >
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue={priorityColor}
        name="radio-buttons-group"
        onChange={evt => onColorChange(evt.target.value)}
        sx={{ display: 'flex', gap: '8px' }}
        row
      >
        {radio.map(button => {
          const { value, radioColor } = button;
          return (
            <FormControlLabel
              key={value}
              value={value}
              sx={{ margin: '0' }}
              control={
                <Radio
                  sx={{
                    width: '14px',
                    height: '14px',
                    color: 'transparent',
                    backgroundColor: radioColor.static,
                    '&.Mui-checked': {
                      color: radioColor.static,
                      backgroundColor: radioColor.checked,
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
