import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const DataView = ({selectedConcrete}) => {
    return (
        <div>
            <Bar
                data={selectedConcrete}
                options={{
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scaleShowVerticalLines: false,
                scales: {
                  x1: {
                    grid : {
                      display : false
                    },
                    ticks: {
                      max: 500
                    }
                  }}
                }}
            />
    </div>
    );
}


export default DataView;