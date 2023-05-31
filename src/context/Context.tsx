import { createContext, useEffect, useState} from "react";  
import axios from 'axios';

type MainContextType = {
    open: boolean;
    setOpen: (value: boolean) => void;     
    handleClose: () => void;
    handleOpen: () => void;
};

const MainContext = createContext<MainContextType>({} as MainContextType);

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {

      const [dataList, setDataList] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost/workflow/rest/karcin-workflow/rest-api/processorAll', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiY2xpZW50SWQiOiIiLCJuYmYiOjE2ODU0NDcyMjMsImlzcyI6IjEiLCJleHAiOjE2ODU0NDc4MjMsImlhdCI6MTY4NTQ0NzIyMywianRpIjoiZDU0ZWI2YmItMDJiNC00OTljLWI4NjYtMGU5YTc4OWQyMzQxIn0.D0-zj64iU398z2kgDYeWqK1mJqW9M44_Ho51qddizZc'
        ,'Content-Type': 'application/json'}
      })
      
      .then((res) => {
        const responseData = res.data.data;
        setDataList(responseData);
      })  
      
      .catch((err) => console.log(err));
    }, []);

    
    
    // Pop-up Aç Kapat 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);    
  const handleClose = () => setOpen(false);
  const [selectedIdNode, setSelectedIdNode] = useState(null);
    //hangi Node'ye double click olduğunu tutan durum
    const [selectedNode, setSelectedNode] = useState(null);

    //text area kullanıcının modeli doldurduğu state
    const [text, setText] = useState('');

    //kullanıcının hangi methodu seçtiği combobox bilgisi
    const [selectedOption, setSelectedOption] = useState('');

          // seçilen tüm bilgileri tuttuğum state
          const [tableData, setTableData] = useState([]);

           // submit butonuna tıkladığımızda çalışacak fonksiyonlar
           const [isClicked, setIsClicked] = useState(false);

           const handleButtonClick = () => {
            const newTableEntry = {
              processName: selectedNode,
              method: selectedOption,
              model: text,
              id: selectedIdNode
            };
            
            const temp = [...tableData].filter((item) => item.id !== newTableEntry.id);
            temp.push(newTableEntry);
            
            setTableData(temp);
            setIsClicked(true);
            handleClose();
          };
          
          
        // seçilen process e göre hangi methodlar listelenecek
        const [methodList, setMethodList] = useState([]);

        useEffect(() => {
          axios.get(`http://localhost/workflow/rest/karcin-workflow/rest-api/methodAll/${selectedNode}`, {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiY2xpZW50SWQiOiIiLCJuYmYiOjE2ODU0NDcyMjMsImlzcyI6IjEiLCJleHAiOjE2ODU0NDc4MjMsImlhdCI6MTY4NTQ0NzIyMywianRpIjoiZDU0ZWI2YmItMDJiNC00OTljLWI4NjYtMGU5YTc4OWQyMzQxIn0.D0-zj64iU398z2kgDYeWqK1mJqW9M44_Ho51qddizZc',
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            setMethodList(response.data.data);
          })
          .catch(error => {
            console.error(error);
          });
        }, [selectedNode]);

        // seçilen methoda göre eğer model varsa model yoksa false
        const [isModel, setIsModel] = useState('');
        const [parametreData, setParametreData] = useState('');

        useEffect(() => {
          axios.get(`http://localhost/workflow/rest/karcin-workflow/rest-api/modelSwaggerUI/${selectedNode}/${selectedOption}`, {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiY2xpZW50SWQiOiIiLCJuYmYiOjE2ODU0NDcyMjMsImlzcyI6IjEiLCJleHAiOjE2ODU0NDc4MjMsImlhdCI6MTY4NTQ0NzIyMywianRpIjoiZDU0ZWI2YmItMDJiNC00OTljLWI4NjYtMGU5YTc4OWQyMzQxIn0.D0-zj64iU398z2kgDYeWqK1mJqW9M44_Ho51qddizZc',
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            setIsModel(response.data.check);
            setText(response.data.data);
            setParametreData(response.data.parametre);
          })
          .catch(error => {
            console.error(error);
          });
          
        }, [selectedOption]);
        
        // console.log(selectedIdNode);
        console.log(tableData);

        //Aynı node'ye tıkladığımızda açılan pop-up da method bilgilerini tutan state
        const [methodInfoState, setMethodInfoState] = useState('');

      const data: MainContextType ={
       dataList,
       open,
       setOpen,
       handleOpen,
       handleClose,  
       selectedNode,
       setSelectedNode,
       text,
       setText,
       selectedOption,
       setSelectedOption,
       tableData,
       isClicked,
       handleButtonClick,
       methodList,
       isModel,
       setIsModel,
       parametreData,
       setParametreData,
       setSelectedIdNode,
       selectedIdNode,
       methodInfoState,
       setMethodInfoState
      }

    return (
        <MainContext.Provider value={data}>
            {children}
         </MainContext.Provider>
    )
}

export { MainContext, MainContextProvider };
