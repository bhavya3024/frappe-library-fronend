import { Button, DatePicker, Modal, Table } from 'antd';
import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import './AddBookMembers.css';
import dayjs from 'dayjs';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { get, post } from '../../../utils/api';

const format = 'YYYY-MM-DD';


export function AddBookMembers({
    bookId = 0,
    isOpen = false,
    onClose,
}) {
    
    const [membersList, setMembersList] = useState([]);
    const [membersCount, setMembersCount] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const currentDate = moment().format(format);
    const [rentStartDate, setRentStartDate] = useState(dayjs(currentDate, format));
    const [rentEndDate, setRentEndDate] = useState(dayjs(currentDate, format));
    const dispatch = useDispatch();


    const columns = [{
        key: 'id',
        dataIndex: 'id',
        title: 'Member Id',
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
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
            return <Button onClick={() => {
                addBookMember(record.id);
            }}>Add Book Member</Button>
        },
    }]

    const getMembersList = async () => {
        const { newMembers, membersCount } = await get({
            dispatch,
            path: `/books/${bookId}/members`,
            params: {
                page,
                limit,
                add_new_members: true,
            },
        });
        const newMembersJson = JSON.parse(newMembers);
        setMembersList(() => [...newMembersJson]);
        setMembersCount(() => membersCount);
    };

    const addBookMember = async (memberId) => {
        await post({
            dispatch,
            path: `/book-members`,
            data: {
                book_id: bookId,
                rent_start_date: rentStartDate.format(format),
                rent_end_date: rentEndDate.format(format),
                member_id: memberId,
            },
            notification: true,
        });
        if (isOpen) {
            getMembersList();
        }
    }

    useEffect(() => {
        if (isOpen) {
            getMembersList();
        }

    }, [page, limit, isOpen]);

    return (
        <Modal className='add-members-modal' title="Add Members to book" open={isOpen} onOk={async () => {
            onClose(true);
        }} onCancel={() => {
            onClose(true);
        }}>
            <span><strong>Rent Start Date: </strong></span>
            <DatePicker className='date-picker' value={rentStartDate} minDate={dayjs(currentDate, format)} onChange={(event) => {
                setRentStartDate(() => dayjs(moment(event?.toDate()).format(format), format));
                if (rentEndDate.valueOf() < event?.valueOf()) {
                    setRentEndDate(() => dayjs(moment(event?.toDate()).format(format), format));
                }
            }}  />
            <span><strong>Rent End Date: </strong></span>
            <DatePicker className='date-picker' value={rentEndDate} minDate={rentStartDate}  onChange={(event) => {
                setRentEndDate(() => dayjs(moment(event?.toDate()).format(format), format))
                if (rentStartDate.valueOf() > event?.valueOf()) {
                    setRentStartDate(() => dayjs(moment(event?.toDate()).format(format), format));
                }
            }} />
            <Table className='new-members-table'
                title={() => <h3>Members</h3>}
                columns={columns}
                dataSource={membersList}
                onChange={(event) => {
                    if (typeof event?.current === 'number' && event?.current !== page) {
                        setPage(event?.current);
                    }
                    if (typeof event?.pageSize === 'number' && event?.pageSize !== limit) {
                        setLimit(event?.pageSize);
                    }
                }}
                pagination={{
                    total: membersCount,
                    responsive: true,
                }}
                scroll={{
                    y: 400,
                    x: 500
                }}
            />
        </Modal>
    )
}

AddBookMembers.propTypes = {
    bookId: propTypes.number.isRequired,
    isOpen: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
}
