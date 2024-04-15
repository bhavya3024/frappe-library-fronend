import { Typography, Table } from 'antd';
import { useDispatch } from 'react-redux'
import { bookSelected } from '../../actions/books'
import { API_URL } from '../../constants';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './books.css';

const { Text } = Typography;


// Example usage


/*
authors
: 
["Jorge Luis Borges", "Eliot Weinberger"]
average_rating
: 
4.33
created_at
: 
"2024-03-30T19:07:53.812739"
frappe_book_id
: 
17946
id
: 
2
isbn
: 
"0811209059"
isbn13
: 
"9780811209052"
language_code_id
: 
1
num_pages
: 
121
publication_date
: 
"1985-05-29"
publisher_name
: 
"New Directions Publishing Corporation"
ratings_count
: 
1037
stock_amount
: 
99
text_reviews_count
: 
60
title
: 
"Seven Nights"
updated_at
: 
"2024-04-06T20:09:53.938074"
*/

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

    const [books, setBooks] = useState([]);
    const [booksCount, setBooksCount] = useState(0);
    const [page, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const fetchBooks = async () => {
        const { data: { books: bookItems = [], booksCount } } = await axios.get(`${API_URL}/books`, {
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
            <Text><h2>Books</h2></Text>
            <Table className='books-table'
                columns={columns}
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
        </div>
    );
};

export default Books;

Books.propTypes = {
  onBookItemSelected: () => {},
}