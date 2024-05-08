import { useEffect, useState } from 'react';
import React from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { memberSelected } from '../../actions/member';
import AddMember from '../Modals/AddMember/AddMember';
import './Members.css';
import { Table, Button } from 'antd';
import moment from 'moment';
import { get } from '../../utils/api';


export default function Members({
    onMemberSelected
}) {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [members, setMembers] = useState([]);
    const [addMemberModalOpen, setAddMemberModalOpen]  = useState(false);
    const dispatch = useDispatch();


    const getMembers = async () => {
        const { data, count } = await get({
            path: `/members`,
            params: {
                page,
                limit: 10,
            },
            dispatch,
        });
        setMembers(() => [...data]);
        setTotal(() => count);
    }

    const columns = [{
        key: 'id',
        dataIndex: 'id',
        title: 'Member Id',
    }, {
        key: 'first_name',
        dataIndex: 'first_name',
        title: 'first_name',
    },
    {
        key: 'last_name',
        dataIndex: 'last_name',
        title: 'Last Name',
    },
    {
        key: 'email',
        dataIndex: 'email',
        title: 'E-mail'
    },
    {
        key: 'created_at',
        dataIndex: 'created_at',
        title: 'Created At',
        render: (_, record) => {
            return moment(record.created_at).format('DD/MM/YYYY');
        },
    }, {
        key: 'updated_at',
        dataIndex: 'updated_at',
        title: 'Updated At',
        render: (_, record) => {
            return moment(record.updated_at).format('DD/MM/YYYY');
        }
    }]

    useEffect(() => {
        getMembers();
    }, [page])

    return (
        <React.Fragment>
        <Table
        className='members-table'
        title={() => {

            return(<div className='members-table-header'><h1>Members</h1>
               <Button className='add-member-button' type='primary' onClick={() => {
                  setAddMemberModalOpen(true);
               }}>Add New Member</Button>
            </div>);
        }}
        columns={columns}
        dataSource={members}
        pagination={{
            total,
        }}
        onChange={(event) => {
            if (typeof event?.current === 'number' && event?.current !== page) {
                setPage(() => event?.current);
            }
        }}
        onRow={(record) => {
            return {
                onClick() {
                   dispatch(memberSelected({
                      memberId: record.id,
                   }));
                   onMemberSelected();
                }
            }
        }}
        scroll={{
            y: 600
        }}
    />
    <AddMember isOpen={addMemberModalOpen} onClose={() => {
        setAddMemberModalOpen(false);
        getMembers();
    }} />
    </React.Fragment>);
}

Members.propTypes  = {
    onMemberSelected: propTypes.func.isRequired,
}