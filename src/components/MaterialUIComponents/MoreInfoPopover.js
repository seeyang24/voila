import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function MoreInfoPopover(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <InfoOutlinedIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>{props.content}</Typography>
            </Popover>
        </div>
    );
}