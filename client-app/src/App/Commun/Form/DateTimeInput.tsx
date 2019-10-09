import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets';

interface IProps extends FieldRenderProps<Date, HTMLInputElement>, FormFieldProps { }
const DateTimeInput: React.FC<IProps> = (
    {
        input,
        date=false,
        time=false,
        placeholder,
        width,
        meta: { touched, error },
        ...rest
    }) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DateTimePicker
                value={input.value || null}
                placeholder={placeholder}
                onChange={input.onChange}
                onBlur={input.onBlur}
                onKeyDown={(e)=>{e.preventDefault()}}
                date={date}
                time={time}
                {...rest}
            />
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
}

export default DateTimeInput
