import React, {useState} from 'react';
import InputRange from 'react-input-range';
import './SuperInput.css'



const SuperInput = () => {
    const [value, setValue] = useState({min: 1, max: 50});

    const onChangeHandler = (value: number | Range) => {
        //@ts-ignore
        setValue({...value})
    }
    return (
            <InputRange
                step={1}
                classNames=
                    {{
                    activeTrack: 'input-range__track input-range__track--active',
                    disabledInputRange: 'input-range input-range--disabled',
                    inputRange: 'input-range',
                    labelContainer: 'input-range__label-container',
                    maxLabel: 'input-range__label input-range__label--max',
                    minLabel: 'input-range__label input-range__label--min',
                    slider: 'input-range__slider',
                    sliderContainer: 'input-range__slider-container',
                    track: 'input-range__track input-range__track--background',
                    valueLabel: 'input-range__label input-range__label--value',
                }}
                draggableTrack={false}
                allowSameValues={false}
                maxValue={100}
                minValue={0}
                value={value}
                //@ts-ignore
                onChange={onChangeHandler}
            />
    );
}

export default SuperInput;
