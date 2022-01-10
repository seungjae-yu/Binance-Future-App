import React from "react";
import ShowCondition from "../../components/drawer/Drawer";

const ShowConditionContainer = () => {
    const [value, setValue] = React.useState("filter");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return <ShowCondition value={value} handleChange={handleChange} />;
};

export default ShowConditionContainer;
