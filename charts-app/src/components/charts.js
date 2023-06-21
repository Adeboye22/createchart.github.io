import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import Api from '../api/posts'

const Charts = () => {
  const [ averageTemp, setAverageTemp ] = useState([]);
  const [ date, setDate ] = useState([]);

  useEffect( () => {
    const fetchData = async() => {
      try{
        const data = await Api.get('temperature')
        setAverageTemp(data?.map((item) => item.average_temp))
        setDate(data?.map((item) => item.date))
      } catch(error){
        console.log(error)
      }
    };
    fetchData();
  }, [])

  const series = [ //data on the y-axis
      {
          name: "Temperature in Celsius",
          data: averageTemp
      }
  ];

  const options = { //data on the x-axis
      chart: { id: 'bar-chart' },
      xaxis: {
          categories: date
      }
  };

  return (
    <div>
      <Chart 
      options={options}
      series={series}
      type='bar'
      width='450'
      />
    </div>
  )
}

export default Charts
