import { Menu } from 'antd';
import { useState } from 'react';
import Books from '../Books/Books';
import BookDetails from '../BookDetail/BookDetails';
import './dashboard.css';
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

    const onMenuItemClicked = (selectedKey) => {
        setKey(selectedKey);
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

        </div>
    );
};
export default Dashboard;