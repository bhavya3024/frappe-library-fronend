import './MemberDetails.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { get } from '../../utils/api';
import { useParams } from 'react-router-dom';

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
    key: 'num_pages',
    dataIndex: 'num_pages',
    title: 'Number of Pages',
},
{
    key: 'average_rating',
    dataIndex: 'average_rating',
    title: 'Average Rating',
},
{
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
        return moment(record.rent_end_date).format('DD/MM/YYYY');
    },
},
{
    key: 'rent_end_date',
    dataIndex: 'rent_end_date',
    title: 'Rent End Date',
    render: (_, record) => {
        return moment(record.rent_end_date).format('DD/MM/YYYY');
    },
},
{
    key: 'rent_paid',
    dataIndex: 'rent_paid',
    title: 'Rent Paid',
    render: (_, record) => {
        return <>{record.rent_paid ? <CheckCircleFilled style={{
            color: 'green',
        }
        } /> : <CloseCircleFilled style={{
            color: 'red',
        }} />}</>
    }
}
]

const MemberDetails = () => {
    let member = useSelector((state) => state.memberReducer);
    // eslint-disable-next-line
    const memberId = member.memberId ||  parseInt(useParams().id);
    const [memberBooks, setMemberBooks] = useState([]);
    const [memberDetails, setMemberDetails] = useState({});
    const [memberBooksCount, setMemberBooksCount] = useState(0);
    const [pendingDues, setPendingDues] = useState(0);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();


    const getMembers = async () => {
        const { data, pending_dues } = await get({
            path: `/members/${memberId}`,
            dispatch,
        });
        setMemberDetails(() => ({
            ...data
        }));
        setPendingDues(() => pending_dues || 0);
    };



    const getBookDetails = async () => {
        const { data, count } = await get({
            dispatch,
            path: `/members/${memberId}/books`,
            params: {
                page,
                limit: 10,
            }
        });
        const memberBooks = JSON.parse(data);
        setMemberBooks(() => [...memberBooks]);
        setMemberBooksCount(() => count);
    }




    useEffect(() => {
        getMembers();
    }, []);

    useEffect(() => {
        getBookDetails();
    }, [page]);




    return (
        <Card title="Member Details">
            <div className='member-details'>
                <table className='member-details-table'>
                    <tbody>
                        <tr>
                            <td>
                                <strong>First Name:</strong>
                            </td>
                            <td>
                                {memberDetails.first_name}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Last Name:</strong>
                            </td>
                            <td>
                                {memberDetails.last_name}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Member Email:</strong></td>
                            <td>
                                {memberDetails.email}
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Pending Dues:</strong>
                            </td>
                            <td>
                                {pendingDues}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Last Name:</strong>
                            </td>
                            <td>
                                {memberDetails.last_name}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Member Email:</strong></td>
                            <td>
                                {memberDetails.email}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Table className='book-members-table'
                title={() => <h3>Book Members</h3>}
                columns={columns}
                dataSource={memberBooks}
                onChange={(event) => {
                    if (typeof event?.current === 'number' && event?.current !== page) {
                        setPage(event?.current);
                    }
                }}
                pagination={{
                    total: memberBooksCount,
                    responsive: true,
                }}
                scroll={{
                    y: 400,
                }}
            />
        </Card>
    );
};

export default MemberDetails;