import { Popover, Whisper, Button, Dropdown } from "rsuite";
import React from "react";
import Icon from "../Icon/Icon";
import css from "./Theme.module.css";
import { useTheme } from "../../hooks/useTheme";

const MenuPopover = React.forwardRef(({ onSelect, ...rest }, ref) => (
  <Popover ref={ref} {...rest} full className={css.popover}>
    <Dropdown.Menu onSelect={onSelect}>
      <Dropdown.Item eventKey={1}>Dark</Dropdown.Item>
      <Dropdown.Item eventKey={2}>Light</Dropdown.Item>
      <Dropdown.Item eventKey={3}>Violet</Dropdown.Item>
    </Dropdown.Menu>
  </Popover>
));

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const ref = React.useRef();
  function handleSelectMenu(eventKey, event) {
    if (eventKey === 1) {
      setTheme("dark");
    }
    if (eventKey === 2) {
      setTheme("light");
    }

    console.log(eventKey);
    ref.current.close();
  }
  return (
    <Whisper
      placement="bottomStart"
      controlId="control-id-with-dropdown"
      trigger="click"
      ref={ref}
      speaker={<MenuPopover onSelect={handleSelectMenu} />}
    >
      <Button className={css.theme_button}>
        Theme <Icon id="chevron-down" className={css.chevron_down} />
      </Button>
    </Whisper>
  );
};

export default Theme;
