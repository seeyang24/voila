import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme ({
    palette: {
        primary: { main: '#000000' },
        secondary: { main: '#af1419' }
    },
});

export default function Theme(props) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}