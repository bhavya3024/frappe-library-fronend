import ReactApexChart from "react-apexcharts"
import propTypes from 'prop-types';


export default function Chart({
    options = {},
    series = [],
    height = 350,
    type = "bar",
    width = 350,
    title = '',
}) {
    return (
        <div>
            <h3>{title}</h3>
            <ReactApexChart
                options={options}
                series={series}
                type={type}
                height={height}
                width={width}
                title={title}
            />
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