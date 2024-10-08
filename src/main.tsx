import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'reactflow/dist/style.css';
import "semantic-ui-css/semantic.min.css";
import "./assets/scss/App.scss";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
