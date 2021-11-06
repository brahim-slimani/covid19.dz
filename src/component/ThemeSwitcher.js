import React, { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {

    const [theme, setTheme] = useState("light");

    const onThemeSwitch = () => {
        Promise.resolve(switchTheme()).then(() => {
            setTheme(theme === "dark" ? "light" : "dark");
        })
    }

    const switchTheme = () => {
        document.documentElement.setAttribute("data-theme", theme === "dark" ? "light" : "dark");
        document.getElementById("pagestyle").setAttribute("href", theme === "dark" ? "/covid19.dz/assets/themes/light-theme.css" : "/covid19.dz/assets/themes/dark-theme.css");
    }

    useEffect(() => {
        //switchTheme();
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("pagestyle").setAttribute("href", "/covid19.dz/assets/themes/light-theme.css");
    }, [])


    return (
        <div style={styledParentProps} className="px-3" onClick={onThemeSwitch}>
            <i className={`switcher-child ${theme === "dark" ? "pi pi-sun" : "pi pi-moon"}`}
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
    height: '45px',
    cursor: 'pointer',
    boxShadow: '1px 1px 5px black',
    display: 'flex',
    alignItems: 'center'
}

const styledChildProps = {
    fontSize: "22px",
    color: 'orange',
}