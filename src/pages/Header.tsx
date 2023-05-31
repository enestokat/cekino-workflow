import { useState, useRef, useCallback, useContext } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from '../components/Sidebar';
import { MainContext } from '../context/Context';
import BurgerMenu from '../components/BurgerMenu';

const initialNodes = [
  {
    id: 'B',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 5},
  },
  ];

  let id = 0;
  const getId = () => `dndnode_${id++}`;

const Header = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
  
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const sourceLabel = event.dataTransfer.getData('text/plain'); // Sürüklenen düğümün adını aldım
  
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
  
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let id=getId()
      const newNode = {
        id: id,
        type,
        position,
        data: { label: sourceLabel, id:id }, 
      };
      setSelectedIdNode(id)
      setNodes((nodes) => [...nodes, newNode]);
    },
    [reactFlowInstance]
  );

 // CONTEXT
 const { handleOpen, setSelectedNode, tableData, setSelectedIdNode, setText, setMethodInfoState } = useContext(MainContext)
 
// //node'ye doubleClick olduğunda // 
const onNodeDoubleClick = (event, node) => {
  try {
    let find = tableData.find((i) => i.id === node.data.id);
    setText(find.model);
    setSelectedIdNode(node.data.id); // node'ye doubleClick olduğunda id'si

    if (find) {
      setMethodInfoState(find.method);
      // node'nin id'sine göre ilgili method değerini selectedOption olarak atıyoruz
    }
  } catch (error) {
    // Hata yönetimi
  }

  const nodeLabel = node.data.label;
  setSelectedNode(nodeLabel);
  handleOpen();
};


// 1. Edge tıklayınca 
const onEdgeClick = useCallback((event, edge) => {
  if (edge.id === "reactflow__edge-1-dndnode_0") {
    // İstenilen işlemleri burada gerçekleştir
    alert("1. bağlantiya tiklandi!");
  }
}, []);

        // Edge'lerin id'sini öğrenmek için
// const onEdgeClick = useCallback((event, edge) => {
//   console.log('handle onConnect', edge);
// }, []);

  return (
      <>
        <div className="dndflow">
          <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeClick={onEdgeClick}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeDoubleClick={onNodeDoubleClick}
                fitView
                >
                <Controls position="top-left"/>
                <Panel position="bottom-left">
                  <BurgerMenu />
                </Panel>
              </ReactFlow>
            </div>
            <Sidebar />
          </ReactFlowProvider>
        </div>
      </>
  );
};

export default Header;






