import React from 'react'
import {Pie} from 'react-chartjs-2' 
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
ArcElement,
Title,
Tooltip,
Legend,
} from 'chart.js';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
ArcElement,
Title,
Tooltip,
Legend
);

function Chart() {
    const data = {
        labels: ['Conluidas','Canceladas','Seguimiento'],
        datasets:[
            {
                label: 'Solicitudes hechas a atención ciudadana en 2021',
                data:[260,85,126],
                backgroundColor: ['Blue','Yellow','Orange']
            }
        ]
    }
    const options = {
        title:{
            display: true,
            text: 'Pie Chart'
        }
    }
  return <Pie data={data} options={options}/>
  
}

export default Chart