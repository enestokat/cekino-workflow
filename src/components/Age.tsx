import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";
import { MainContext } from "../context/Context";
import { useContext,useEffect } from 'react';

const Ace = ({}) => {
  
    
    const { isModel, setText, text } = useContext(MainContext);
    
    
    const onChange = (newValue) => {
      setText(newValue);
    }
   
    return (
      
          <AceEditor
            readOnly={!isModel}
            mode="yaml"
            theme="github"
            name="ace"
            value={text}
            onChange={onChange}
          />
      
    )
};

export default Ace;