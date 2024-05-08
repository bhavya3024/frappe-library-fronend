import { Spin } from 'antd';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './Spin.css';

export default function Spinner() {
    const enable = useSelector(state => {
        return state.spinReducer.enable
    });
    return (
        <Spin className='spinner' spinning={enable} fullscreen />
    );
}

Spinner.propTypes = {
    enable: propTypes.bool.isRequired
}
