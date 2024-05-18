import ReactApexChart from "react-apexcharts"
import propTypes from 'prop-types';
import { useEffect } from "react";
import { Card } from "antd";


export default function Chart({
    options = {},
    series = [],
    height = 350,
    type = "bar",
    width = 350,
    title = '',
}) {

    useEffect(() => {
        // https://github.com/apexcharts/vue-apexcharts/issues/185#issuecomment-642836287
        window.dispatchEvent(new Event('resize'));
    }, []);


    return (
        <div>
            <Card title={title}>
                <ReactApexChart
                    options={options}
                    series={series}
                    type={type}
                    height={height}
                    width={width}
                    title={title}
                />
            </Card>
        </div>
    );
}

Chart.propTypes = {
    options: propTypes.object,
    series: propTypes.arrayOf(propTypes.object),
    width: propTypes.number,
    height: propTypes.number,
    type: propTypes.string,
    title: propTypes.string
}