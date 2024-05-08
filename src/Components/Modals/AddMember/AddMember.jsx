import { Form, Modal, Input } from 'antd';
import { useState } from 'react';
import propTypes from 'prop-types';
import './AddMember.css';
import FormItem from 'antd/es/form/FormItem';

import { post } from '../../../utils/api';
import { useDispatch } from 'react-redux';

export default function AddMember({
    isOpen = false,
    onClose,
}) {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const addNewMember = async () => {
        await post({
            dispatch,
            path: '/members',
            data: {
                first_name: firstName,
                last_name: lastName,
                email: email,
            },
            notification: true,
        });
    }

    return (
        <Modal isOpen={isOpen} className='add-member-modal' title="Add Members to book" open={isOpen} okText={'Add New Member'} onOk={async () => {
            await addNewMember();
            onClose();
        }} onCancel={() => {
            onClose();
        }}>
            <Form>
                <FormItem>
                    <label form='firsName'>First Name</label>
                    <Input name='firstName' value={firstName} onChange={(event) => setFirstName(event?.target?.value)} />
                </FormItem>
                <FormItem>
                    <label>Last Name</label>
                    <Input name='lastName' value={lastName} onChange={(event) => setLastName(event?.target?.value)} />
                </FormItem>
                <FormItem>
                    <label>Email</label>
                    <Input type='email' value={email} onChange={(event) => setEmail(event?.target?.value)} />
                </FormItem>
            </Form>
        </Modal>
    )
}

AddMember.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
}
