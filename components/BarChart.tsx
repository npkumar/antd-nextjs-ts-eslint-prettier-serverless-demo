import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Chart, Interval, Interaction } from 'bizcharts'
import { Drawer } from 'antd'
const today = dayjs()
const oneMonthFromNow = today.add(1, 'month')
const data = []
for (let day = today; day.isBefore(oneMonthFromNow); day = day.add(1, 'day')) {
  data.push({
    date: day.format('YYYY-MM-DD'),
    price: 16000 + Math.random() * 4000,
  })
}

const BarChart: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const [date, setDate] = useState()
  const [price, setPrice] = useState()

  const onClickHandler = (e) => {
    const data = e?.data?.data

    if (data) {
      const { date, price } = data
      setDate(date)
      setPrice(price)
      setIsVisible(true)
    }
  }

  return (
    <>
      <Drawer
        width="640"
        title={date}
        placement="right"
        closable
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        key="right"
      >
        <h1>Price: {Number.parseFloat(price).toFixed(2)}</h1>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Chart autoFit padding="auto" data={data} onPlotClick={onClickHandler}>
        <Interval position="date*price" />
        {/* <Interaction type="element-highlight" /> */}
        <Interaction type="active-region" />
      </Chart>
    </>
  )
}

export default BarChart
