import { Table, Card, Progress, Tag, Space, Button } from 'antd';
import { CheckCircleFilled, } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './BookDetails.css';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './BookDetails.css';
import moment from 'moment';
import { BookStockAmount } from '../Modals/BookStocks/AddBookStocks';
import { AddBookMembers } from '../Modals/AddBookMemebers/AddBookMembers';


function stringToColor(string) {
    // Create a hash from the string using the DJB2 algorithm
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = (hash * 33) ^ string.charCodeAt(i);
    }

    // Extract RGB values from the hash
    const r = (hash >> 16) & 0xFF;
    const g = (hash >> 8) & 0xFF;
    const b = hash & 0xFF;

    // Convert RGB values to hex format
    const colorHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return colorHex;
}



const BookDetails = () => {
    const { bookId } = useSelector((state) => state.bookReducer);
    const [book, setBook] = useState({});
    const [bookMembersList, setBookMembersList] = useState([]);
    const [bookMembersCount, setBookMembersCount] = useState(0);
    const [page, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [stockModalOpen, setStockModalOpen] = useState(false);
    const [addBookMembersModlaOpen, setAddBookMembersModlaOpen] = useState(false);

    const columns = [{
        key: 'id',
        dataIndex: 'id',
        title: 'Book Member Id',
    }, {
        key: 'first_name',
        dataIndex: 'first_name',
        title: 'First Name',
    },
    {
        key: 'last_name',
        dataIndex: 'last_name',
        title: 'Last Name',
    },
    {
        key: 'email',
        dataIndex: 'email',
        title: 'Email'
    }, {
        key: 'rent_start_date',
        dataIndex: 'rent_start_date',
        title: 'Rent Start Date',
        render: (_, record) => {
            return moment(record.rent_start_date).format('DD/MM/YYYY');
        },
    },
    {
        key: 'rent_end_date',
        dataIndex: 'rent_end_date',
        title: 'Rent End Date',
        render: (_, record) => {
            return moment(record.rent_start_date).format('DD/MM/YYYY');
        },
    },
    {
        key: 'rent_paid',
        dataIndex: 'rent_paid',
        title: 'Rent Paid',
        render: (_, record) => {
            if (record.rent_paid) {
                return <CheckCircleFilled />
            }
            return <></>
        }
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
            if (!record.rent_paid) {
                return (
                    <Space size="middle">
                        <Button type='primary' onClick={() => {
                            clearDues(record.id);
                        }}>Clear Dues</Button>
                    </Space>)
            }
            return <>No Actions Available</>;
        },
    },]

    const clearDues = async (bookMemberId) => {
        await axios.patch(`${API_URL}/book-members/${bookMemberId}/pay-dues`);
        await getBookMembers();
    };

    const getBookMembers = async () => {
        const { data: { bookMembers, bookMembersCount } } = await axios.get(`${API_URL}/books/${bookId}/members`, {
            params: {
                page,
                limit
            }
        });
        const bookMembersJson = JSON.parse(bookMembers);
        setBookMembersList(() => [...bookMembersJson]);
        setBookMembersCount(() => bookMembersCount);
    }

    const getBookDetails = async () => {
        const { data: { book = {} } } = await axios.get(`${API_URL}/books/${bookId}`);
        setBook(() => ({
            ...book
        }));
    }

    useEffect(() => {
        getBookMembers();
    }, [page, limit]);

    const calculateRatingPercentage = (rating) => {
        return rating * 100 / 5;
    };

    const calculateActualRating = (percentage) => {
        return percentage * 5 / 100;
    }

    useEffect(() => {
        getBookDetails();
        getBookMembers();
    }, []);


    return (
        <Card title={book.title} className='book-details-table'>
            <div className='book-details'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Ratings:</strong>
                            </td>
                            <td>
                                <Progress
                                    style={{
                                        width: '50%',
                                    }}
                                    type='circle'
                                    size={'default'}
                                    percent={calculateRatingPercentage(book.average_rating)}
                                    format={(percentage) => `${calculateActualRating(percentage)}/5`}
                                ></Progress>
                            </td>
                            <td>
                                <strong>Authors:</strong>
                            </td>
                            <td>
                                {(book.authors ?? []).map((author) => (
                                    <Tag color={stringToColor(author)} key={Math.random()}>{author}</Tag>
                                ))}
                            </td>
                            <td><strong>Actions:</strong></td>
                            <td>
                                <Button type='primary' onClick={() => {
                                    setAddBookMembersModlaOpen(true);
                                }}>Add a New Book Member</Button>
                            </td>
                            <td>
                                <Button type='primary' onClick={() => {
                                    setStockModalOpen(true);
                                }}>Increase Stocks From Market</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Published At:</strong>
                            </td>
                            <td>
                                {book.publication_date}
                            </td>
                            <td>
                                <strong>Total Ratings:</strong>
                            </td>
                            <td>
                                {book.ratings_count}
                            </td>
                            <td>
                                <strong>Publisher:</strong>
                            </td>
                            <td>
                                {book.publisher_name}
                            </td>
                            <td>
                                <strong>Total Text Reviews:</strong>
                            </td>
                            <td>{book.text_reviews_count}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Number of Pages:</strong>
                            </td>
                            <td>{book.num_pages}</td>
                            <td>
                                <strong>ISBN:</strong>
                            </td>
                            <td>{book.isbn}</td>
                            <td>
                                <strong>ISBN 13:</strong>
                            </td>
                            <td>{book.isbn13}</td>
                            <td>
                                <strong>Total Book Members:</strong>
                            </td>
                            <td>{bookMembersCount}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Stock:</strong>
                            </td>
                            <td>
                                {book.stock_amount}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Table className='book-members-table'
                title={() => <h3>Book Members</h3>}
                columns={columns}
                dataSource={bookMembersList}
                onChange={(event) => {
                    if (typeof event?.current === 'number' && event?.current !== page) {
                        setCurrentPage(event?.current);
                    }
                    if (typeof event?.pageSize === 'number' && event?.pageSize !== limit) {
                        setLimit(event?.pageSize);
                    }
                }}
                pagination={{
                    total: bookMembersCount,
                    responsive: true,
                }}
                scroll={{
                    y: 400,
                }}
            />
            <BookStockAmount
                bookId={bookId}
                isOpen={stockModalOpen}
                onClose={async (refresh) => {
                    setStockModalOpen(false);
                    if (refresh) {
                        await getBookDetails();
                    }
                }}
            />
            <AddBookMembers
              bookId={bookId}
              isOpen={addBookMembersModlaOpen}
              onClose={async (refresh) => {
                  setAddBookMembersModlaOpen(false);
                  if (refresh) {
                    await getBookMembers();
                  }
              }}
            />
        </Card>
    );
};

export default BookDetails;