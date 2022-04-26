import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

interface Props {
    title: string;
    //backgroundColor: string;
}

const TitleStyle = {
    marginBottom: "10px",
};

const backgroundColor = { background: "#2b6777" };

const Title = ({ title }: Props) => {
    return (
        <div style={TitleStyle}>
            <AppBar position="relative" style={backgroundColor}>
                <Toolbar>
                    <Typography component="h2" variant="h4">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default React.memo(Title);
