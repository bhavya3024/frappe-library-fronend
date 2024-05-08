import { Card, Button } from "antd";
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="frappe-main-page">
      <Card title={"Welcome to Frappe Library management system"} className="frappe-dummy-login-card">
        <Button className="frappe-login-button" onClick={() => navigate('/books')}>Click here to Login</Button>
      </Card>
    </div>
  )
}

export default App
