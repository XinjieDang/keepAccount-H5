import {
  Button,
  Space,
  Popup,
  DatePicker,
  Card,
  Tag,
  Selector,
  TextArea,
  NumberKeyboard,
} from 'antd-mobile'
import React, { useState } from 'react'
import style from './index.module.less'
import {
  DownOutline,
  AddCircleOutline,
  MinusCircleOutline,
  FillinOutline,
} from 'antd-mobile-icons'
import Item from 'antd-mobile/es/components/dropdown/item'
export default function Home() {
  //类型选择弹出层
  const [visibleType, setvisibleType] = useState(false)
  //记账弹出层
  const [visibleAccountEdit, setVisibleAccountEdit] = useState(false)
  // 时间选择器
  const [pickerVisible, setPickerVisible] = useState(false)
  //时间选择 精确到日
  const [pickerVisible2, setPickerVisible2] = useState(false)
  //当前选择的类型key
  const [currentKey, setCurrentKey] = useState(100)
  //当前切换的记账类型
  const [currentKaTypeKey, setCurrentKaTypeText] = useState(1)
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
  //切换记账类型
  const handleSwitchKaType = (e: React.MouseEvent<HTMLSpanElement>) => {
    setCurrentKaTypeText(Number(e.currentTarget.dataset.key))
  }
  //弹出备注信息
  const [addRemark, setRemark] = useState(false)
  const [keyboardValue, setKeyboardValue] = useState('')
  //键盘输入时
  const handleKeyBoardInput = (v: string) => {
    setKeyboardValue(keyboardValue + v)
  }
  //键盘删除时
  const handleKeyBoardOnDelete = () => {
    setKeyboardValue(keyboardValue.substring(0, keyboardValue.length - 1))
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
  // 账单类型列表
  const accountlist = [
    {
      key: 1,
      DateText: '2022-12',
      income: 100,
      expenses: 200,
      list: [
        {
          key: 1,
          type: 0,
          accountText: '餐饮',
          account: 200,
          date: '22:00',
        },
        {
          key: 2,
          type: 1,
          accountText: '收款',
          account: 100,
          date: '8:00',
        },
      ],
    },
    {
      key: 2,
      DateText: '2022-12',
      income: 100,
      expenses: 200,
      list: [
        {
          key: 1,
          type: 0,
          accountText: '餐饮',
          account: 200,
          date: '22:00',
        },
        {
          key: 2,
          type: 1,
          accountText: '收款',
          account: 100,
          date: '8:00',
        },
      ],
    },
  ]
  //记账类型
  const keepAccountTypeList = [
    {
      key: 1,
      text: '收入',
      kaType: 0,
    },
    {
      key: 2,
      text: '支出',
      kaType: 1,
    },
  ]

  const options = [
    {
      label: '选项1',
      value: '1',
    },
    {
      label: '选项二',
      value: '2',
    },
    {
      label: '选项三',
      value: '3',
    },
    {
      label: '选项四',
      value: '4',
    },
    {
      label: '选项五',
      value: '5',
    },
    {
      label: '选项六',
      value: '6',
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
              size="mini"
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
  //弹出层编辑
  const mockContentEdit = (
    <>
      <div className={style.popAccountEdit}>
        <div className={style.categoryBox}>
          <div className={style.categoryList}>
            {keepAccountTypeList.map((item) => (
              <Tag
                round
                color={item.key === currentKaTypeKey ? 'success' : 'default'}
                fill="outline"
                key={item.key}
                data-key={item.key}
                onClick={handleSwitchKaType}
              >
                {item.text}
              </Tag>
            ))}
          </div>
          <div>
            <Tag
              round
              color="default"
              fill="outline"
              onClick={() => setPickerVisible2(true)}
            >
              12-31
              <Space>
                <DownOutline />
              </Space>
            </Tag>
          </div>
        </div>
        <div className={style.accountBox}>
          <span>¥</span>&nbsp;<span>{keyboardValue}</span>
        </div>
        <div className={style.selectorBox}>
          <Selector
            className={style.selectBoxList}
            options={options}
            defaultValue={['1']}
            showCheckMark={false}
            onChange={(arr, extend) => console.log(arr, extend.items)}
          />
        </div>
        <div className={style.remark}>
          <p onClick={() => setRemark(!addRemark)}>添加备注</p>
          <div
            className={style.TextArea}
            style={{ display: addRemark === true ? 'block' : 'none' }}
          >
            <TextArea
              autoSize
              placeholder="请输入备注信息"
              showCount
              maxLength={50}
            />
          </div>
        </div>
        {/* 键盘 */}
        <NumberKeyboard
          showCloseButton={false}
          onInput={handleKeyBoardInput}
          onDelete={handleKeyBoardOnDelete}
          visible={
            pickerVisible2 === true ? !visibleAccountEdit : visibleAccountEdit
          }
          customKey={'-'}
          confirmText="确定"
        />
      </div>
    </>
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
          <DatePicker
            visible={pickerVisible2}
            onClose={() => {
              setPickerVisible2(false)
            }}
            precision="day"
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
          {accountlist.map((item) => (
            <Card
              className={style.contanerCar}
              title={item.DateText}
              key={item.key}
              extra={
                <div className={style.extra}>
                  <AddCircleOutline />
                  <div>￥1888</div>
                  <MinusCircleOutline />
                  <div>￥18888</div>
                </div>
              }
            >
              {item.list.map((item) => (
                <div className={style.carItemList} key={item.key}>
                  <div className={style.carItem}>
                    <div>{item.accountText}</div>
                    <div
                      style={{ color: item.type === 0 ? '#99ff99' : '#fdacac' }}
                    >
                      {item.type === 0
                        ? '+' + item.account
                        : '-' + item.account}
                    </div>
                  </div>
                  <div className={style.carItemTime}>{item.date}</div>
                </div>
              ))}
            </Card>
          ))}
        </div>
      </div>
      {/* 固定编辑按钮 */}
      <div
        className={style.editIcon}
        onClick={() => setVisibleAccountEdit(true)}
      >
        <FillinOutline fontSize={24} />
      </div>
      {/* 记账弹出层 */}
      <Popup
        visible={visibleAccountEdit}
        showCloseButton
        onMaskClick={() => {
          setVisibleAccountEdit(false)
        }}
        bodyStyle={{ height: '79vh' }}
        onClose={() => setVisibleAccountEdit(false)}
      >
        {mockContentEdit}
      </Popup>
    </>
  )
}
