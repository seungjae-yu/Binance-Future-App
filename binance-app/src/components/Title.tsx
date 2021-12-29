import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const Title = () => {
    return (
        <div>
            <AppBar position="relative" style={{ background: "#4B4A67" }}>
                <Toolbar>
                    <Typography component="h2" variant="h4">
                        Binance Future App
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Title;
