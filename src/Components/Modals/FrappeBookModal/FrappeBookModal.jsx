import { Modal, Table, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import './FrappeBookModal.css';
import { get, post } from '../../../utils/api';
import { useDispatch } from 'react-redux';

export default function FrappeBookModal({
  isOpen = false,
  onClose,
}) {
  const [page, setPage] = useState(1);
  const [frappeBooks, setFrappeBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const importFrappeBook = async (isbn) => {
    await post({
      dispatch,
      path: `/frappe-books/import-books`,
      data: {
        frappeBookIsbnNumbers: [isbn],
      },
      notification: true,
    });
    await getFrappeBooks();
  }

  const columns = [
    {
      title: 'Book ID',
      dataIndex: 'bookID',
      key: 'bookID',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',
    },
    {
      title: 'Average Rating',
      dataIndex: 'average_rating',
      key: 'average_rating',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    {
      title: 'ISBN13',
      dataIndex: 'isbn13',
      key: 'isbn13',
    },
    {
      title: 'Language Code',
      dataIndex: 'language_code',
      key: 'language_code',
    },
    {
      title: 'Number of Pages',
      dataIndex: 'num_pages',
      key: 'num_pages',
    },
    {
      title: 'Ratings Count',
      dataIndex: 'ratings_count',
      key: 'ratings_count',
    },
    {
      title: 'Text Reviews Count',
      dataIndex: 'text_reviews_count',
      key: 'text_reviews_count',
    },
    {
      title: 'Publication Date',
      dataIndex: 'publication_date',
      key: 'publication_date',
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: 'Import Status',
      dataIndex: 'is_imported',
      key: 'is_imported',
      render: (_, record) => <>{record.is_imported ? 'Yes' : 'No'}</>
    },
    {
      title: 'Action',
      dataIndex: 'Actions',
      key: 'Action',
      render: (_, record) => <>{!record.is_imported ? <Button onClick={() => {
        importFrappeBook(record['isbn']);
      }}>Import</Button> : ''}</>
    }
  ];

  const getFrappeBooks = async () => {
    const params = {
      page
    }
    if (searchText) {
      params.title = searchText;
    }
    const { frappe_books } = await get({
      dispatch,
      path: '/frappe-books',
      params,
    });
    setFrappeBooks(() => [...frappe_books]);
  }

  useEffect(() => {
    getFrappeBooks();
  }, [page, searchText]);


  return (
    <Modal isOpen={isOpen} className='frappe-book-modal' open={isOpen} okText={'Add New Member'} closable={true}
      footer={false}
      destroyOnClose={true}
      onCancel={() => {
         onClose();
      }}
      afterClose={() => {
        onClose();
      }}
    >
      <Table className='frappe-books-table'
        columns={columns}
        title={() => (<>
          <h1>Frappe Books Market Place</h1>
          <Input placeholder='search a book title to import from' onChange={(event) => {
            setPage(1);
            setSearchText(event?.target?.value);
          }} />
        </>)}
        dataSource={frappeBooks}
        onChange={(event) => {
          if (typeof event?.current === 'number' && event?.current !== page) {
            setPage(event?.current);
          }
        }}
        pagination={false}
        scroll={{
          y: 400,
        }}
      />
      <div className='table-custom-buttons'>
        <span>Current Page: <strong>{page}</strong></span>
        <Button type="primary" onClick={() => {
          setPage(page - 1);
        }} disabled={page === 1}>Prev</Button>
        <Button type="primary" color="green" onClick={() => {
          setPage(page + 1)
        }}>Next</Button>
      </div>
    </Modal>
  )
}

FrappeBookModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
}
