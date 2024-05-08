import { Table, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { bookSelected } from '../../actions/books'
import { API_URL } from '../../constants';
import { useState, useEffect } from 'react';
import FrappeBookModal from '../Modals/FrappeBookModal/FrappeBookModal'
import './books.css';
import { get } from '../../utils/api';

const columns = [{
    key: 'id',
    dataIndex: 'id',
    title: 'Book Id',
}, {
    key: 'title',
    dataIndex: 'title',
    title: 'Book Title',
},
{
    key: 'nop',
    dataIndex: 'nop',
    title: 'Number of Pages',
},
{
    key: 'publishedAt',
    dataIndex: 'publishedAt',
    title: 'Published At'
}, {
    key: 'publisherName',
    dataIndex: 'publisherName',
    title: 'Publisher',
}, {
    key: 'nor',
    dataIndex: 'nor',
    title: 'Number of Ratings',
},
{
    key: 'avgRating',
    dataIndex: 'avgRating',
    title: 'Average Rating',
},
{
    key: 'stockAmount',
    dataIndex: 'stockAmount',
    title: 'Available Amount',
}]


const Books = ({
    onBookItemSelected,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [booksCount, setBooksCount] = useState(0);
    const [page, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [frappeBookModalOpen, setFrappeBookModalOpen] = useState(false);

    const fetchBooks = async () => {
        const { books: bookItems = [], booksCount } = await get({
            dispatch,
            path: `${API_URL}/books`, 
            params: {
                page,
                limit,
            }
        });
        const newBooks = [];
        for (const bookItem of bookItems) {
            newBooks.push({
                key: Math.random(),
                id: bookItem.id,
                title: bookItem.title,
                authors: bookItem.authors,
                nop: bookItem.num_pages,
                publishedAt: bookItem.publication_date,
                publisherName: bookItem.publisher_name,
                nor: bookItem.ratings_count,
                avgRating: bookItem.average_rating,
                stockAmount: bookItem.stock_amount,
            });
        }
        setBooks(() => [...newBooks]);
        setBooksCount(() => booksCount);
    };

    useEffect(() => {
        fetchBooks();
    }, [page, limit]);

    return (
        <div className='books-library'>
            <Table className='books-table'
                columns={columns}
                title={() => {
                    return(<div className='members-table-header'><h1>Books</h1>
                       <Button className='add-member-button' type='primary' onClick={() => {
                          setFrappeBookModalOpen(true);
                       }}>Import New Books From the Library</Button>
                    </div>);
                }}
                dataSource={books}
                onChange={(event) => {
                    if (typeof event?.current === 'number' && event?.current !== page) {
                        setCurrentPage(event?.current);
                    }
                    if (typeof event?.pageSize === 'number' && event?.pageSize !== limit) {
                        setLimit(event?.pageSize);
                    }
                }}
                pagination={{
                    total: booksCount,
                    responsive: true,
                }}
                onRow={(record) => {
                    return {
                        onClick() {
                             navigate(`/books/${record.id}`);
                            onBookItemSelected();
                            dispatch(bookSelected({
                                bookId: record.id,
                            }))
                        }
                    }
                }}
                scroll={{
                    y: 600,
                }}
            />
            <FrappeBookModal isOpen={frappeBookModalOpen} onClose={() => {
                 setFrappeBookModalOpen(false);
            }} />
        </div>
    );
};

export default Books;

Books.propTypes = {
  onBookItemSelected: () => {},
}