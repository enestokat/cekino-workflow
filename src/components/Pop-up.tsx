import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainContext } from '../context/Context';
import { useContext,useEffect } from 'react';
import SelectionBox from './SelectionBox';
import { Form, Icon } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
//deneme
import Ace from "./Age";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  minHeight: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  padding: 0,
  borderRadius: '8px',
};

export default function BasicModal() {
  const { open, handleClose,tableData, setText, text, handleButtonClick, isModel, setIsModel, parametreData, selectedIdNode } = useContext(MainContext)

  // const handleInputChange = (event) => {
  //   setText(event.target.value);
  // };

  useEffect(() => {
    if(open == true && !tableData.some(i=> i.id == selectedIdNode) ){
      setText('');
      setIsModel('');
    }
  }, [open])
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <div className='pop-up-header'>
            <h3>Yeni Ekle</h3>
          <span className='pop-up-close'
              onClick={() => handleClose()} >
              x
          </span>
          </div>
          <div className='pop-up-title'>
            <h4>Method</h4>
          </div>
          <div className='pop-up-selectionBox-container'>
            <div className='pop-up-selectionBox'>
              <SelectionBox />
            </div>
          </div>
          {isModel ? (
            <div>
              <div className='pop-up-title'>
                <h4>Parametre</h4>
              </div>
              <div className='parametre-buton-container2'>
                {parametreData.map((data, index) => (
                  <Button key={index} color='blue'>{data}</Button>
                  ))}
              </div>
            </div>
           ) : isModel === false ? (
             <div className='parametre-buton-container'><Button color='red'>{parametreData}</Button></div>
             ) : null
            }
          <div className='pop-up-title'>
            <h4>Model</h4>
          </div>
            <Ace />
          <Form>
          {/* <Form.TextArea
            readOnly={!isModel}
            className='textarea'
            value={text}
            onChange={handleInputChange}
          /> */}
          </Form>
          <div className='pop-up-footer'>
            <Button basic onClick={handleClose}>Cancel</Button>
            <Button onClick={handleButtonClick} color='blue'><Icon name='check'/>Submit</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}











