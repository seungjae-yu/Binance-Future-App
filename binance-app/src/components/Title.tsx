import { AppBar, Toolbar, Typography } from "@material-ui/core";

interface Props {
    title: string;
    backgroundColor: string;
}

const Title = ({ title, backgroundColor }: Props) => {
    return (
        <div style={{ marginBottom: "10px" }}>
            <AppBar position="relative" style={{ background: backgroundColor }}>
                <Toolbar>
                    <Typography component="h2" variant="h4">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Title;
