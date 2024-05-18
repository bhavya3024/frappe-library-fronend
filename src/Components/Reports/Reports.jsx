import { useEffect, useRef, useState } from 'react';
import { cloneDeep } from 'lodash';
import { get } from '../../utils/api'
import ReactApexChart from 'react-apexcharts';
import './Reports.css';
import { useDispatch } from 'react-redux';
import Chart from '../Charts/ApexChart';

const options = {
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: { show: true },
        zoom: { enabled: true }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 10,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
            dataLabels: {
                total: {
                    enabled: true,
                    style: {
                        fontSize: '13px',
                        fontWeight: 900
                    }
                }
            }
        }
    },
    xaxis: {
        categories: [],
    },
    legend: {
        position: 'right',
        offsetY: 40
    },
    fill: {
        opacity: 1
    }
}

const Reports = [{
    api: '/charts/book-stats',
    title: 'Book Statistics',
    series: [{
        name: 'Book Members',
        data: [],
    }, {
        name: 'Stock Amount Count',
        data: [],
    }],
    options: cloneDeep(options),
    height: 350,
}, {
    api: '/charts/member-stats',
    title: 'Member Statistics',
    series: [{
        name: 'Total No of Book Purchases',
        data: [],
    }, {
        name: 'Total No of Book Purchases for which rent is paid',
        data: [],
    }, {
        name: 'Total Price for Book Purchases',
        data: [],
    }, {
        name: 'Total Price for Book Purchases for which rent is paid',
        data: [],
    }],
    options: cloneDeep(options),
    height: 350,
}]

const ApexChart = () => {
    const chartRef = useRef(null);
    const dispatch = useDispatch();
    const [chartWidth, setChartWidth] = useState(0);

    const callApis = async () => {
        const { stats: bookStats = [] } = await get({
            path: Reports[0].api,
            dispatch,
        });

        if (bookStats?.length) {
            Reports[0].options.xaxis.categories = bookStats.map(book => book.title);
            Reports[0].series[0].data = bookStats.map(book => book.book_members_count);
            Reports[0].series[1].data = bookStats.map(book => book.stock_amount);
        }

        const { stats: rentStats = [] } = await get({
            path: Reports[1].api,
            dispatch,
        });
        if (rentStats) {
            Reports[1].options.xaxis.categories = rentStats.members_stats.map(m => m.name);
            Reports[1].series[0].data = rentStats.members_stats.map(m => m.count);
            Reports[1].series[1].data = rentStats.members_rent_paid_stats.map(m => m.count);
            Reports[1].series[2].data = rentStats.members_stats.map(m => m.price);
            Reports[1].series[3].data = rentStats.members_rent_paid_stats.map(m => m.price);
        }
        
    }


    useEffect(() => {
        callApis();
        if (chartRef.current) {
            const handleResize = (entries) => {
                for (let entry of entries) {
                    setChartWidth(entry.contentRect.width - 100);
                }
            };
            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(chartRef.current);
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, []);

    return (
        <div ref={chartRef} className='chart-container'>
            {Reports.map((report) => <Chart title={report.title} width={chartWidth} key={Math.random()} series={report.series} options={report.options} type={report.type} height={report.height} />)}
        </div>
    );
};

export default ApexChart;