import React, { useState } from 'react';

export const ThemeSwitcher = (props) => {

    const [theme, setTheme] = useState("light");

    const onThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }


    return (
        <div style={styledParentProps} onClick={onThemeSwitch}>

            <i
                className={`switcher-child ${theme === "dark" ? "pi pi-sun" : "pi pi-moon"}`}
                style={styledChildProps}
            />

        </div>
    );
}

const styledParentProps = {
    position: 'fixed',
    bottom: '20px',
    left: '0px',
    backgroundColor: '#191e29',
    borderRadius: '0 50px 50px 0',
    height: '40px',
    padding: '5px 15px 10px 10px',
    cursor: 'pointer',
    boxShadow: '1px 1px 5px black'
}

const styledChildProps = {
    fontSize: "20px",
    color: 'orange',
}