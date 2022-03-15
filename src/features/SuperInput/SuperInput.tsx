import React from 'react';
import InputRange from 'react-input-range';
import './SuperInput.css'



type SuperInputType = {
    isFetching:boolean
    maxCardsCount: number
    filterByNumberOfCards: (value: ValueNumberOfCardsType) => void
    value: ValueNumberOfCardsType
    setValue: (value: ValueNumberOfCardsType) =>void
}
export type ValueNumberOfCardsType = {
    min: number
    max: number
}
const SuperInput = ({value, setValue, maxCardsCount, filterByNumberOfCards, isFetching}: SuperInputType) => {
    const onChangeHandler = (value: ValueNumberOfCardsType) => {
        if(value.min < 0 || value.max > maxCardsCount){
            return
        }
        setValue({...value})
    }
    const onChangeCompleteHandler = () => {
        filterByNumberOfCards(value)
    }
    return (
        <InputRange
            disabled={isFetching}
            step={1}
            onChangeComplete={onChangeCompleteHandler}
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
            maxValue={150}
            minValue={0}
            value={value}
            //@ts-ignore
            onChange={onChangeHandler}
        />
    );
}

export default SuperInput;
