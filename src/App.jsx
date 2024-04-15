import { Card, Button } from "antd";
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  
  return (
    <>
       <Card title={"Welcome to Frappe library management system"} style={{ 
         width: 500
       }}>
            <Button onClick={() =>  navigate('/dashboard')}>Click here to Login</Button>
       </Card>
    </>
  )
}

export default App
