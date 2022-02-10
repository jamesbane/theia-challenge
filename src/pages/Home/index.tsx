import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout';
import Chart from 'kaktana-react-lightweight-charts'

import style from './Home.module.scss';
import {liveData} from "./data";
import moment from "moment";
import PieChart from "../../components/PieChart";
import Panel from "../../components/Panel";
import {
    DollarOutlined,
    InfoCircleOutlined,
    MoneyCollectOutlined,
    PieChartOutlined,
    UserOutlined
} from '@ant-design/icons';
import cn from "classnames";
import {Select} from "antd";
import axios from "axios";
const { Option } = Select;


export default function Home() {
    const [monthOption, setMonthOption] = useState(1);
    const options = {
        alignLabels: true,
        timeScale: {
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderVisible: false,
            borderColor: "#fff000",
            visible: true,
            timeVisible: true,
            secondsVisible: false
        }
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        const newData: any = [];
        axios.get(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=1839&range=${monthOption === 1 ? '1M' : monthOption === 2 ? '3M' : '1Y' }`).then(resp => {
            for (const key in resp.data.data.points) {
                const item = resp.data.data.points[key];
                newData.push({
                    'time': (moment.unix(parseInt(key)).format('YYYY-MM-DD')),
                    'value': item.v[0]
                })
            }
            setData(newData);
        })
    }, [monthOption])

    return (
        <Layout>
            <div className={style.container}>
                <div className="content">
                    <div className={'flex justify-content-between'}>
                        <h1>Fair Offering data</h1>
                        <Select value={monthOption} style={{ width: 120 }} onChange={(v) => setMonthOption(parseInt(v.toString()))}>
                            <Option value={1}>1 month</Option>
                            <Option value={3}>3 months</Option>
                            <Option value={12}>1 year</Option>
                        </Select>
                    </div>
                    <Chart
                        options={options}
                        areaSeries={[{data: data}]}
                        autoWidth
                        height={320}
                        from={data.length > 0 ? data[0]['time'] : 0}
                        to={data.length > 0 ? data[data.length-1]['time'] : 0}
                    />

                    <h1>Live data</h1>
                    <div className={style.panelContainer}>
                        <Panel wrapperClass={style.panelPie}>
                            <PieChart data={{
                                type: '# of investors',
                                value: liveData.numOfInvestors
                            }}/>
                        </Panel>

                        <Panel>
                            <div className={style.panelItem}>
                                <div className={cn(style.panelIcon, style.blue)}>
                                    <DollarOutlined />
                                </div>
                                <div>
                                    <div className={style.panelValue}>{liveData.amountOfInvest}</div>
                                    <div className={style.panelText}>Invested in Fairmint</div>
                                </div>
                            </div>
                        </Panel>
                        <Panel>
                            <div className={style.panelItem}>
                                <div className={cn(style.panelIcon, style.purple)}>
                                    <UserOutlined />
                                </div>
                                <div>
                                    <div className={style.panelValue}>{liveData.companyValuation}</div>
                                    <div className={style.panelText}>Company valuation</div>
                                </div>
                            </div>
                        </Panel>
                        <Panel>
                            <div className={style.panelItem}>
                                <div className={cn(style.panelIcon, style.green)}>
                                    <MoneyCollectOutlined />
                                </div>
                                <div>
                                    <div className={style.panelValue}>{liveData.amountOfPurchase}</div>
                                    <div className={style.panelText}>Purchased by investors</div>
                                </div>
                            </div>
                        </Panel>
                        <Panel>
                            <div className={style.panelItem}>
                                <div className={cn(style.panelIcon, style.red)}>
                                    <PieChartOutlined />
                                </div>
                                <div>
                                    <div className={style.panelValue}>{liveData.equityPercentage}</div>
                                    <div className={style.panelText}>Equity allocation</div>
                                </div>
                            </div>
                        </Panel>
                    </div>

                    <h1>FAIR Rolling SAFE Parameters</h1>
                    <div className={cn(style.parameters, 'ant-row')}>
                        <Panel wrapperClass={cn(style.parameterItem, 'ant-col-xs-24 ant-col-sm-12 ant-col-md-7 ant-col-lg-4')}>
                            <InfoCircleOutlined className={'infoIcon'}/>
                            <div className={style.infoValue}>{liveData.equityPercentage}</div>
                            <div className={style.infoText}>Investor equity allocation</div>
                        </Panel>
                        <Panel wrapperClass={cn(style.parameterItem, 'ant-col-xs-24 ant-col-sm-12 ant-col-md-7 ant-col-lg-4')}>
                            <InfoCircleOutlined className={'infoIcon'}/>
                            <div className={style.infoValue}>{liveData.stakeHolderEquity}</div>
                            <div className={style.infoText}>Stakeholders equity allocation</div>
                        </Panel>
                        <Panel wrapperClass={cn(style.parameterItem, 'ant-col-xs-24 ant-col-sm-12 ant-col-md-7 ant-col-lg-4')}>
                            <InfoCircleOutlined className={'infoIcon'}/>
                            <div className={style.infoValue}>12 months</div>
                            <div className={style.infoText}>Lock-up period</div>
                        </Panel>
                        <Panel wrapperClass={cn(style.parameterItem, 'ant-col-xs-24 ant-col-sm-12 ant-col-md-7 ant-col-lg-4')}>
                            <InfoCircleOutlined className={'infoIcon'}/>
                            <div className={style.infoValue}>USDC</div>
                            <div className={style.infoText}>Reserve currency</div>
                        </Panel>
                        <Panel wrapperClass={cn(style.parameterItem, 'ant-col-xs-24 ant-col-sm-12 ant-col-md-7 ant-col-lg-4')}>
                            <InfoCircleOutlined className={'infoIcon'}/>
                            <div className={style.infoValue}>{liveData.minimumInvestment}</div>
                            <div className={style.infoText}>Minimum investment</div>
                        </Panel>
                    </div>
                </div>
            </div>
        </Layout>
    )
}