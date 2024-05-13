import { Popover, Whisper, Button, Dropdown } from "rsuite";
import React from "react";
import Icon from "../Icon/Icon";
import css from "./Theme.module.css";
import { useTheme } from "../../hooks/useTheme";

const MenuPopover = React.forwardRef(({ onSelect, ct, ...rest }, ref) => (
  <Popover ref={ref} {...rest} full className={css.popover} ct={ct}>
    <Dropdown.Menu onSelect={onSelect}>
      <Dropdown.Item eventKey={1} style={{ color: ct === "dark" && "#bedbb0" }}>
        Dark
      </Dropdown.Item>
      <Dropdown.Item
        eventKey={2}
        style={{ color: ct === "light" && "#bedbb0" }}
      >
        Light
      </Dropdown.Item>
      <Dropdown.Item
        eventKey={3}
        style={{ color: ct === "violet" && "#5255bc" }}
      >
        Violet
      </Dropdown.Item>
    </Dropdown.Menu>
  </Popover>
));

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const ref = React.useRef();

  const ct = theme;

  function handleSelectMenu(eventKey, event) {
    setTheme(event.target.textContent.toLowerCase());

    ref.current.close();
  }
  return (
    <Whisper
      placement="bottomStart"
      controlId="control-id-with-dropdown"
      trigger="click"
      ref={ref}
      speaker={<MenuPopover onSelect={handleSelectMenu} ct={ct} />}
    >
      <Button className={css.theme_button} aria-label="theme">
        Theme <Icon id="chevron-down" className={css.chevron_down} />
      </Button>
    </Whisper>
  );
};

export default Theme;
