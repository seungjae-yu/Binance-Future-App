import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

interface Props {
    radioOption: string;
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export enum radioOptions {
    "slowK" = "slowK",
    "movingAvg" = "movingAvg",
    "all" = "all",
}

const SearchRadio = ({ radioOption, handleChange }: Props) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">조회 대상</FormLabel>
            <RadioGroup
                aria-label="searchCond"
                row
                name="searchCond"
                value={radioOption}
                onChange={handleChange}
            >
                <FormControlLabel
                    value={radioOptions.slowK}
                    control={<Radio color="primary" />}
                    label="slow % K"
                />
                <FormControlLabel
                    value={radioOptions.movingAvg}
                    control={<Radio color="primary" />}
                    label="Moving Avg"
                />
                <FormControlLabel
                    value={radioOptions.all}
                    control={<Radio color="primary" />}
                    label="ALL"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default SearchRadio;
