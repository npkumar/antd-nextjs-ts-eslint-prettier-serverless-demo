import React, { useState } from 'react'
import { Button, Calendar, Drawer, PageHeader, Popover, Space, Tag } from 'antd'
import moment, { Moment } from 'moment'

const getListData = (value: Moment) => {
  switch (value.date()) {
    case 8:
      return [
        { type: 'warning', content: 'Warning event' },
        { type: 'success', content: 'Normal event' },
      ]
    case 10:
      return [
        { type: 'warning', content: 'Warning event' },
        { type: 'success', content: 'Normal event' },
        { type: 'error', content: 'Important event' },
      ]
    case 15:
      return [
        { type: 'warning', content: 'Warning event' },
        { type: 'success', content: 'Normal event' },
        { type: 'error', content: 'Important event 1.' },
        { type: 'error', content: 'Important event 2.' },
        { type: 'error', content: 'Important event 3.' },
        { type: 'error', content: 'Important event 4.' },
      ]
    default:
      return []
  }
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394
  }
}

function monthCellRender(value) {
  const num = getMonthData(value)
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
    </div>
  ) : null
}

const Stats: React.FC = () => {
  const [value, setValue] = useState(moment())
  const [isVisible, setIsVisible] = useState(false)

  const onPanelChange = (value) => {
    setValue(value)
  }

  const onSelect = (value) => {
    setValue(value)
  }

  const dateCellRender = (value) => {
    const listData = getListData(value)
    return (
      <Popover
        title={value.format('YYYY-MM-DD')}
        content={() => {
          return (
            <Space direction="vertical">
              {listData.map((item, index) => (
                <div key={index}>
                  <Tag color={item.type}>{item.content}</Tag>
                </div>
              ))}
              <Button onClick={() => setIsVisible(true)}>More</Button>
            </Space>
          )
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div style={{ textAlign: 'center', marginTop: 16, marginBottom: 16, fontSize: 16 }}>
            ¥12000
          </div>
          <Space direction="vertical">
            {listData.map((item, index) => (
              <Tag key={index} color={item.type}>
                {item.content}
              </Tag>
            ))}
          </Space>
        </div>
      </Popover>
    )
  }

  return (
    <>
      <Drawer
        width="640"
        title="Title"
        placement="right"
        closable
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        key="right"
      >
        <h1>Price</h1>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <PageHeader backIcon={false} title="Stats" subTitle="Description for stats" />
      <Calendar
        value={value}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </>
  )
}

export default Stats
