import React from 'react'
import {Pie} from "@ant-design/plots";

const PieChart = (props) => {
    const data = props.data;
    const config = {
        appendPadding: 10,
        data: [data],
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: false,
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: `<div><div style="font-size: 10px"># of investors</div><div>${data.value}</div></div>`,
            },
        },
    };
    return (
        <Pie {...config} />
    );
};

export default PieChart;