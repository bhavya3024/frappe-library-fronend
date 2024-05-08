import { Input, Modal } from 'antd';
import { useState } from 'react';
import propTypes from 'prop-types';
import { patch } from '../../../utils/api';


export function BookStockAmount({
    bookId = 0,
    isOpen = false,
    onClose,
}) {

    const [stockAmount, setStockAmount] = useState(1);

    const addStocks = async () => {
        await patch({
            path: `/books/${bookId}/stock-amounts`,
            data: {
                stock_amount: stockAmount,
            },
            notification: true,
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
