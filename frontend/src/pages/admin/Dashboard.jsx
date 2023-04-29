import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { employeeStatAction } from '../../redux/admin/actions/employeeAction'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getEmployeeData } from '../../redux/admin/reducers/employeeReducer';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const { stats } = useSelector(getEmployeeData)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(employeeStatAction())
    }, [])
    const data = {


        labels: ['online', 'cod', 'cancel', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# Payment',
                data: [stats?.paidOrders, stats?.codOrders, stats?.CancleOrders],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235 )',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162,1)',

                ],
                borderWidth: 1,
            },
        ]

    }
    return <Doughnut data={data} />;
}
