import { Popover, Whisper, Button, Dropdown } from "rsuite";
import React from "react";
import Icon from "../Icon/Icon";
import css from "./Theme.module.css";
import { useTheme } from "../../hooks/useTheme";

const MenuPopover = React.forwardRef(({ onSelect, ...rest }, ref) => (
  <Popover ref={ref} {...rest} full className={css.popover}>
    <Dropdown.Menu onSelect={onSelect}>
      <Dropdown.Item eventKey={1} className={css.dark}>
        Dark
      </Dropdown.Item>
      <Dropdown.Item eventKey={2} className={css.light}>
        Light
      </Dropdown.Item>
      <Dropdown.Item eventKey={3} className={css.violet}>
        Violet
      </Dropdown.Item>
    </Dropdown.Menu>
  </Popover>
));

const Theme = () => {
  const { setTheme } = useTheme();
  const ref = React.useRef();

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
      speaker={<MenuPopover onSelect={handleSelectMenu} />}
    >
      <Button className={css.theme_button} aria-label="theme">
        Theme <Icon id="chevron-down" className={css.chevron_down} />
      </Button>
    </Whisper>
  );
};

export default Theme;
