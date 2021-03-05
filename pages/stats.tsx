import React, { useEffect, useState, useRef } from 'react'
import {
  BackTop,
  Button,
  Calendar,
  Col,
  Drawer,
  notification,
  PageHeader,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd'
import moment, { Moment } from 'moment'
import throttle from 'lodash/throttle'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'

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

  const calenderRef = useRef(null)

  useEffect(() => {
    const handleScroll = throttle((e) => {
      // if (calenderRef && calenderRef.current) {
      //   if (calenderRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
      //     setValue((pv) => {
      //       const nextValue = pv.clone().add(1, 'month')
      //       window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      //       notification.info({
      //         message: `${nextValue.format('MMM, YYYY')}`,
      //         description: `You are currently viewing ${nextValue.format('MMM, YYYY')}`,
      //         placement: 'topRight',
      //       })
      //       return nextValue
      //     })
      //   }
      // }
    }, 1500)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
      <div ref={calenderRef}>
        <Calendar
          value={value}
          onPanelChange={onPanelChange}
          onSelect={onSelect}
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          headerRender={({ value, type, onChange, onTypeChange }) => {
            const start = 0
            const end = 12
            const monthOptions = []

            const current = value.clone()
            const localeData = value.localeData()
            const months = []
            for (let i = 0; i < 12; i++) {
              current.month(i)
              months.push(localeData.monthsShort(current))
            }

            for (let index = start; index < end; index++) {
              monthOptions.push(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Select.Option className="month-item" key={`${index}`}>
                  {months[index]}
                </Select.Option>
              )
            }
            const month = value.month()

            const year = value.year()
            const options = []
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push(
                <Select.Option key={i} value={i} className="year-item">
                  {i}
                </Select.Option>
              )
            }
            return (
              <div style={{ padding: 8 }}>
                <Row gutter={8} justify="end">
                  <Col>
                    <Typography.Title level={3}>{value.format('MMM, YYYY')}</Typography.Title>
                  </Col>
                  <Col>
                    <Radio.Group onChange={(e) => onTypeChange(e.target.value)} value={type}>
                      <Radio.Button value="month">Month</Radio.Button>
                      <Radio.Button value="year">Year</Radio.Button>
                    </Radio.Group>
                  </Col>
                  <Col>
                    <Select
                      dropdownMatchSelectWidth={false}
                      className="my-year-select"
                      onChange={(newYear) => {
                        const now = value.clone().year(parseInt(newYear, 10))
                        onChange(now)
                      }}
                      value={String(year)}
                    >
                      {options}
                    </Select>
                  </Col>
                  <Col>
                    <Select
                      dropdownMatchSelectWidth={false}
                      value={String(month)}
                      onChange={(selectedMonth) => {
                        const newValue = value.clone()
                        newValue.month(parseInt(selectedMonth, 10))
                        onChange(newValue)
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        onChange(value.clone().subtract(1, 'month'))
                      }}
                    >
                      Prev Month
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        onChange(value.clone().add(1, 'month'))
                      }}
                    >
                      Next Month
                    </Button>
                  </Col>
                </Row>
              </div>
            )
          }}
        />
      </div>
      <BackTop style={{ marginRight: 60, marginBottom: -32 }} visibilityHeight={1}>
        <Space>
          <Button
            icon={<CaretLeftOutlined />}
            type="primary"
            onClick={() => {
              setValue((pv) => {
                const nextValue = pv.clone().subtract(1, 'month')
                notification.info({
                  message: `${nextValue.format('MMM, YYYY')}`,
                  description: `You are currently viewing ${nextValue.format('MMM, YYYY')}`,
                  placement: 'topRight',
                })
                return nextValue
              })
            }}
          >
            Prev
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setValue((pv) => {
                const nextValue = pv.clone().add(1, 'month')
                notification.info({
                  message: `${nextValue.format('MMM, YYYY')}`,
                  description: `You are currently viewing ${nextValue.format('MMM, YYYY')}`,
                  placement: 'topRight',
                })
                return nextValue
              })
            }}
          >
            Next <CaretRightOutlined />
          </Button>
        </Space>
      </BackTop>
    </>
  )
}

export default Stats
