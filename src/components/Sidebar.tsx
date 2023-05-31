import { Icon } from 'semantic-ui-react';
import { DragEvent, SetStateAction, useContext, useState } from 'react';
import { MainContext } from '../context/Context';

export default () => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('text/plain', (event.target as HTMLDivElement).innerText); // Sürüklenen düğümün içindeki metni aktardım
    event.dataTransfer.effectAllowed = 'move';
  };
  const { dataList } = useContext(MainContext)
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };
  const filteredDataList = dataList.filter((element) =>
    element.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <aside>
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <span className="search-icon"><Icon name="search" /></span>
    </div>
      <div>
      {filteredDataList.map((element, index) => (
              <div
                key={index}
                id={element}
                className={`dndnode ${element}`}
                onDragStart={(event) => onDragStart(event, 'default')}
                draggable
              >
                {element}
              </div>
          ))}
      </div>
  </aside>
  );
};