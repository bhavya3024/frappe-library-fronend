import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import './Spin.css';

export default function Spinner() {
    const enable = useSelector(state => {
        return state.spinReducer.enable || false
    });
    return (
        <Spin className='spinner' spinning={enable} fullscreen />
    );
}
