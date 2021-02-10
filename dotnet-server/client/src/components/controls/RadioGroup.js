import React from 'react';
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

const GreenRadio = withStyles({
    root: {
        color: teal[400],
        '&$checked': {
            color: teal[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" required {...props} />);

export default function RadioGroup(props) {

    const { name, label, value, onChange, items } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup
                row
                required
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        item => (
                            <FormControlLabel key={item.id} value={item.id} control={<GreenRadio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
};