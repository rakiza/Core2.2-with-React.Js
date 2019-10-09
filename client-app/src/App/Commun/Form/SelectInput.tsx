import React from 'react'
import {FieldRenderProps} from 'react-final-form';
import { Form, FormFieldProps,Select, Label } from 'semantic-ui-react';


interface IProps extends FieldRenderProps<string,HTMLSelectElement>,FormFieldProps{

}
const SelectInput:React.FC<IProps> = ({input,value,options,width,placeholder,meta:{touched,error}}) => (<Form.Field error={touched && !!error} width={width}>
    <Select 
    value={value} 
    onChange={(event,data)=>{input.onChange(data.value)}}
    options={options}
    placeholder={placeholder} /> 
    {touched && error && <Label basic color='red'>{error}</Label>}
</Form.Field>)

export default SelectInput
