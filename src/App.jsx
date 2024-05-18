import { Card, Button } from "antd";
import './App.css';
import FrappeImage from '../public/frappe-logo.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="frappe-main-page">
      <Card title={"Welcome to Frappe Library management system"}
          style={{ width: 'fit-content' }} 
          cover={<img alt="example" src={FrappeImage} style={{ width: 'fit-content', marginLeft: 'auto', marginRight: 'auto', paddingTop: '5px', paddingBottom: '5px' }}  />}
       className="frappe-dummy-login-card">
        <Button className="frappe-login-button" onClick={() => navigate('/books')}>Click here to Login</Button>
      </Card>
    </div>
  )
}

export default App
