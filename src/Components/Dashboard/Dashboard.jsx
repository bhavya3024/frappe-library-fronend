import { Menu } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import Books from '../Books/Books';
import BookDetails from '../BookDetail/BookDetails';
import Members from '../Members/Members';
import './dashboard.css';
import MemberDetails from '../MemberDetail/MemberDetail';
import Spinner from '../Spin/Spin';

const items = [
    {
        key: 'books',
        label: <>Books</>
    },
    {
        key: 'members',
        label: <>Members</>
    },
];

const Dashboard = () => {
    const [key, setKey] = useState('books');
    const navigate = useNavigate();

    const setMenuItem = () => {
        const pathname = window.location.pathname;       
        if (pathname.startsWith('/books')) {
           setKey('books');
        } else if (pathname.startsWith('/members')) {
           setKey('members');
        }
    } 


    useEffect(() => {
        setMenuItem();
    }, []);

    const onMenuItemClicked = (selectedKey) => {
        setKey(selectedKey);
        if (selectedKey === 'books') {
            navigate('/books');
        } else if (selectedKey === 'members') {
            navigate('/members');
        }
    };

    return (
        <div className='dashboard'>
            <Menu
                onClick={(event) => {
                    onMenuItemClicked(event.key);
                }}
                title='Welcome to frappe library'
                className='menu'
                defaultSelectedKeys={[key]}
                mode="inline"
                items={items}
            />
            {key === 'books' && <Books className='books'
                onBookItemSelected={() => {
                    setKey('bookDetails');
                }} />}
            {key === 'bookDetails' && <BookDetails />}
            {key === 'members' && <Members onMemberSelected={() => {
                  setKey('memberDetails')
            }} />}
            {key === 'memberDetails' && <MemberDetails />}
            <Spinner />
        </div>
    );
};
export default Dashboard;