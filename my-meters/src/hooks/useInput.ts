import { SelectChangeEvent } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";

interface TValidateTypes {
  [key: string]: {
    re: RegExp,
    errorBorderColor: string
  }
}

interface IUseInputCustom {
  setInputValue: (value: React.SetStateAction<string>) => void
}

interface IUseInputStandard {
  value: string
  error: boolean
  onChange: (e: SyntheticEvent<Element, Event> |
                React.KeyboardEvent<HTMLInputElement> | 
                React.ChangeEvent<HTMLSelectElement | 
                HTMLInputElement |
                HTMLTextAreaElement> | 
                SelectChangeEvent<string>) => void
  onBlur: () => void  
}

const useInput = (initial: string, validateType: string): [IUseInputStandard, IUseInputCustom] => {

  // validateType: positiveNumber, notNullText, password

  const validateTypes: TValidateTypes = {
    positiveNumber: {
      re: /^\d*[1-9]\d*$/,
      errorBorderColor: 'red.300',
    },
    notNullText: {
      re: /^(.+){3,128}$/,
      errorBorderColor: 'crimson',
    },   
    password: {
      re: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
      errorBorderColor: 'crimson',
    },
    email: {
      re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorBorderColor: 'crimson',
    },
  }

  const [value, setValue] = useState(initial);
  const [error, seterror] = useState(false);

  const setInputValue = (value: React.SetStateAction<string>) => setValue(value)

  const validateInput = () => {

    var error = false;

    for (let thisType in validateTypes) {            
      if (validateType === thisType && 
          !String(value).match(validateTypes[thisType].re)
        ) {
        seterror(true);

        error = true;        
      }
    }

    if (!error) {
      seterror(false);  
    }    
  }

  let resultStandard: IUseInputStandard = {
    value,
    error,    
    onChange: (e: SyntheticEvent<Element, Event> | 
                  React.KeyboardEvent<HTMLInputElement> | 
                  React.ChangeEvent<HTMLSelectElement | 
                  HTMLInputElement |
                  HTMLTextAreaElement> | 
                  SelectChangeEvent<string>) => {
      var target = e.target as HTMLSelectElement
      setValue(target.value)      
      validateInput()
    },
    onBlur: validateInput    
  }

  const resultCustom: IUseInputCustom = {
    setInputValue
  }

  if (validateType === 'required' && !value) {
    resultStandard['error'] = true;
  } else if (validateType === 'required' && value) {
    resultStandard['error'] = false; 
  }

  return [resultStandard, resultCustom];
};

export default useInput