import { Input, Modal } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants';
import propTypes from 'prop-types';


export function BookStockAmount({
    bookId = 0,
    isOpen = false,
    onClose,
}) {

    const [stockAmount, setStockAmount] = useState(1);

    const addStocks = async () => {
        await axios.patch(`${API_URL}/books/${bookId}/stock-amounts`, {
            stock_amount: stockAmount,
        });
    }

    return (
        <Modal title="Add stocks to book" open={isOpen} onOk={async () => {
            await addStocks();
            onClose(true);
        }} onCancel={() => {
            onClose(false);
        }}>
            <Input type="number" value={stockAmount} min={1} max={5} onChange={(event) => {
                setStockAmount(() => event?.target?.value);
            }} />
        </Modal>
    )
}

BookStockAmount.propTypes = {
    bookId: propTypes.number.isRequired,
    isOpen: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
}
