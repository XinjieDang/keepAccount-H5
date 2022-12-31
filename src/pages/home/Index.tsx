import { Button, Space, Popup, DatePicker, Card } from 'antd-mobile'
import React, { useState } from 'react'
import style from './index.module.less'
import {
  DownOutline,
  AddCircleOutline,
  MinusCircleOutline,
} from 'antd-mobile-icons'
export default function Home() {
  //类型选择弹出层
  const [visibleType, setvisibleType] = useState(false)
  // 时间选择器
  const [pickerVisible, setPickerVisible] = useState(false)
  //当前选择的类型key
  const [currentKey, setCurrentKey] = useState(100)
  //当前选中类型文字
  const [currentTypeText, setCurrentTypeText] = useState<string>('全部类型')
  //当前选中的日期
  const [pickerValue, setPickerValue] = useState<string | null>('2022-12')
  //点击选中类型时
  const handleActiveItem = (e: React.MouseEvent<HTMLDivElement>) => {
    // 设置当前选中的类型key
    setCurrentKey(Number(e.currentTarget.dataset.key))
    //设置当前选中类型文字
    setCurrentTypeText(e.currentTarget.innerText)
  }
  // 类型菜单列表
  const menuList = [
    {
      key: 1,
      type: '支出',
      list: [
        {
          key: 1,
          title: '餐饮',
        },
        {
          key: 2,
          title: '服饰',
        },
        {
          key: 3,
          title: '出行',
        },
        {
          key: 4,
          title: '旅游',
        },
        {
          key: 5,
          title: '礼物',
        },
        {
          key: 6,
          title: '人情',
        },
      ],
    },
    {
      key: 2,
      type: '收入',
      list: [
        {
          key: 7,
          title: '餐饮',
        },
        {
          key: 8,
          title: '服饰',
        },
        {
          key: 9,
          title: '交通',
        },
      ],
    },
  ]
  // 弹窗层类型内容
  const mockContent = (
    <div>
      <div className={style.popTitle}>请选择类型</div>
      <div className={style.popContent}>
        <div className={style.popMenuList}>
          <div className={style.allType}>
            <Button
              color="primary"
              fill="solid"
              size="middle"
              onClick={() => setCurrentTypeText('全部类型')}
            >
              全部类型
            </Button>
          </div>
          {menuList.map((item) => (
            <div className={style.list} key={item.key}>
              <h3 style={{ paddingBottom: '15px' }}>{item.type}</h3>
              <div className={style.listBox}>
                {item.list.map((item) => (
                  <div
                    className={`${style.listItem} ${
                      currentKey === item.key ? style.activeCurrent : ''
                    }`}
                    key={item.key}
                    data-key={item.key}
                    onClick={handleActiveItem}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  return (
    <>
      {/* 头部 */}
      <div className={style.header}>
        <div className={style.countTitle}>
          总支出:<span>￥1758544</span>
        </div>
        <div className={style.countTitle}>
          总收入:<span>￥1758544</span>
        </div>
        {/* 条件筛选 */}
        <div className={style.selectBtn}>
          <Button
            fill="outline"
            block
            size="mini"
            shape="rounded"
            color={'primary'}
            onClick={() => setvisibleType(!visibleType)}
          >
            <Space>
              <span>{currentTypeText}</span>
              <DownOutline />
            </Space>
          </Button>
          <Button
            fill="outline"
            block
            size="mini"
            shape="rounded"
            color="primary"
            onClick={() => setPickerVisible(true)}
          >
            <Space>
              <span>{pickerValue}</span>
              <DownOutline />
            </Space>
          </Button>
          {/* 弹出层 */}
          <Popup
            visible={visibleType}
            showCloseButton
            onMaskClick={() => {
              setvisibleType(false)
            }}
            bodyStyle={{ height: '60vh' }}
            onClose={() => setvisibleType(false)}
          >
            {mockContent}
          </Popup>
          {/* 日期选择 */}
          <DatePicker
            visible={pickerVisible}
            onClose={() => {
              setPickerVisible(false)
            }}
            precision="month"
            onConfirm={(val) => {
              setPickerValue(
                val.getFullYear() + '-' + val.getMonth().toString()
              )
            }}
          />
        </div>
      </div>
      {/* 中间内容 */}
      <div className={style.contaner}>
        <div className={style.contanerBoxList}>
          <Card
            className={style.contanerCar}
            title="2022-12"
            extra={
              <div>
                <AddCircleOutline />
                <MinusCircleOutline />
              </div>
            }
          >
            <div className={style.carItemList}>
              <div className={style.carItem}>
                <div>餐饮</div>
                <div>200</div>
              </div>
              <div className={style.carItemTime}>22:00</div>
            </div>
            <div className={style.carItemList}>
              <div className={style.carItem}>
                <div>餐饮</div>
                <div>200</div>
              </div>
              <div className={style.carItemTime}>22:00</div>
            </div>
          </Card>

          <Card
            className={style.contanerCar}
            title="2022-12"
            extra={
              <div>
                <AddCircleOutline />
                <MinusCircleOutline />
              </div>
            }
          >
            <div className={style.carItemList}>
              <div className={style.carItem}>
                <div>餐饮</div>
                <div>200</div>
              </div>
              <div className={style.carItemTime}>22:00</div>
            </div>
            <div className={style.carItemList}>
              <div className={style.carItem}>
                <div>餐饮</div>
                <div>200</div>
              </div>
              <div className={style.carItemTime}>22:00</div>
            </div>
            <div className={style.carItemList}>
              <div className={style.carItem}>
                <div>餐饮</div>
                <div>200</div>
              </div>
              <div className={style.carItemTime}>22:00</div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
