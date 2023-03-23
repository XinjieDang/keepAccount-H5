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
  Image,
  Toast,
  List,
} from 'antd-mobile'
import * as dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import style from './index.module.less'
import { DownOutline, FillinOutline } from 'antd-mobile-icons'
import api from '@/api'
import zhiImg from '@/assets/images/zhi.png'
import shouImg from '@/assets/images/shou.png'
import PullToRefresh, { PullStatus } from 'antd-mobile/es/components/pull-to-refresh'
const zhiImgSrc = zhiImg
const shouImgSrc = shouImg
// 默认时间
const defaultDate: string = dayjs(new Date()).format('YYYY-MM').toString()
// 下拉刷新自定义文案
const statusRecord: Record<PullStatus, string> = {
  pulling: '用力拉',
  canRelease: '松开吧',
  refreshing: '玩命加载中...',
  complete: '好啦',
}
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
  const [pickerValue, setPickerValue] = useState<string | null>(defaultDate)
  //当前选中的日期
  const [pickerValue2, setPickerValue2] = useState<string | null>(defaultDate)
  //点击选中类型时
  const handleActiveItem = (e: React.MouseEvent<HTMLDivElement>) => {
    // 设置当前选中的类型key
    const currentKey = Number(e.currentTarget.dataset.key)
    setCurrentKey(currentKey)
    //设置当前选中类型文字
    setCurrentTypeText(e.currentTarget.innerText)
    // 发送请求，更新之后关闭弹窗
    queryAmount.categoryId = currentKey
    setQueryAmount({ ...queryAmount })
    getAmountList(queryAmount)
    setvisibleType(false)
  }
  // 记账总对象
  const [sumAmount, setSumAmount] = useState({ allExpend: 0, allIncome: 0 })
  let [options, setOptions] = useState<KaType>([])
  //切换记账类型
  const handleSwitchKaType = (num: number) => {
    setCurrentKaTypeText(num)
    changeKaType(num)
  }

  const changeKaType = (type: number) => {
    let newOption: KaType = []
    //设置账单类型
    const list: any = menuList.filter((item: any) => item.payType == type)
    list[0].list.map((item: any) => {
      newOption.push({
        label: item.categoryName,
        value: item.id,
      })
    })
    setOptions(newOption)
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
  const [menuList, setMenuList] = useState([])
  //获取记账类型菜单
  const getKaTypeMenuList = async () => {
    const res = await api.home.TypeMenuList()
    setMenuList(res)
    //changeKaType(0)
  }

  // 获取记账记录
  const [amountList, setAmountList] = useState([])
  type queryDtoType = {
    categoryId: any
    createTime: string
  }
  const queryAmountRequest: queryDtoType = {
    categoryId: undefined,
    createTime: defaultDate,
  }
  // 记账查询对象
  const [queryAmount, setQueryAmount] = useState<queryDtoType>(queryAmountRequest)
  const getAmountList = (queryDto: queryDtoType) => {
    console.log('发送请求之前的参数', queryAmount)
    api.home.amountInfo(queryAmount).then((res) => {
      setAmountList(res.data)
      sumAmount.allExpend = res.allExpend
      sumAmount.allIncome = res.allIncome
      setSumAmount({ ...sumAmount })
    })
  }

  const [amount, setAmount] = useState({
    categoryId: 0,
    amount: 0,
    remark: '',
    createTime: '',
  })
  //记账弹窗确认提交
  const handleConfirm = () => {
    //设置金额
    amount.amount = parseInt(keyboardValue)
    setAmount({ ...amount })
    //console.log('提交了表单', amount)
    //发送请求
    api.home.addAmount(amount).then((res) => {
      if (res) {
        //刷新记账列表
        getAmountList(queryAmount)
        Toast.show({ content: '添加成功！' })
        //关闭弹出层
        setVisibleAccountEdit(false)
      }
    })
  }
  useEffect(() => {
    getKaTypeMenuList()
    getAmountList(queryAmount)
  }, [])

  //记账类型
  const keepAccountTypeList = [
    {
      key: 0,
      text: '支出',
      kaType: 0,
    },
    {
      key: 1,
      text: '收入',
      kaType: 1,
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
              onClick={() => {
                setCurrentTypeText('全部类型')
                setCurrentKey(100)
                queryAmount.categoryId = undefined
                queryAmount.createTime = ''
                setQueryAmount({ ...queryAmount })
                getAmountList(queryAmount)
                setvisibleType(false)
              }}
            >
              全部类型
            </Button>
          </div>
          {menuList.map((item: any) => (
            <div className={style.list} key={item.payType}>
              <h3 style={{ paddingBottom: '15px' }}>{item.payType == 0 ? '支出' : '收入'}</h3>
              <div className={style.listBox}>
                {item.list.map((item: any) => (
                  <div
                    className={`${style.listItem} ${currentKey === item.id ? style.activeCurrent : ''}`}
                    key={item.id}
                    data-key={item.id}
                    onClick={handleActiveItem}
                  >
                    {item.categoryName}
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
                onClick={() => handleSwitchKaType(item.key)}
              >
                {item.text}
              </Tag>
            ))}
          </div>
          <div>
            <Tag round color="default" fill="outline" onClick={() => setPickerVisible2(true)}>
              {pickerValue2}
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
            defaultValue={[1]}
            showCheckMark={false}
            onChange={(arr, extend) => {
              amount.categoryId = arr[0]
              setAmount({ ...amount })
            }}
          />
        </div>
        <div className={style.remark}>
          <p onClick={() => setRemark(!addRemark)}>添加备注</p>
          <div className={style.TextArea} style={{ display: addRemark === true ? 'block' : 'none' }}>
            <TextArea
              autoSize
              placeholder="请输入备注信息"
              showCount
              maxLength={50}
              onChange={(value) => {
                amount.remark = value
                setAmount({ ...amount })
              }}
            />
          </div>
        </div>
        {/* 键盘 */}
        <NumberKeyboard
          showCloseButton={false}
          onInput={handleKeyBoardInput}
          onDelete={handleKeyBoardOnDelete}
          visible={pickerVisible2 === true ? !visibleAccountEdit : visibleAccountEdit}
          customKey={'-'}
          confirmText="确定"
          onConfirm={handleConfirm}
        />
      </div>
    </>
  )
  return (
    <>
      {/* 头部 */}
      <div className={style.header}>
        <div className={style.countTitle}>
          总支出:<span>￥{sumAmount.allExpend}</span>
        </div>
        <div className={style.countTitle}>
          总收入:<span>￥{sumAmount.allIncome}</span>
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
            bodyStyle={{ height: 'auto' }}
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
              setPickerValue(dayjs(val).format('YYYY-MM'))
              queryAmount.createTime = dayjs(val).format('YYYY-MM')
              setQueryAmount({ ...queryAmount })
              getAmountList(queryAmount)
            }}
          />
          <DatePicker
            visible={pickerVisible2}
            onClose={() => {
              setPickerVisible2(false)
            }}
            precision="day"
            onConfirm={(val) => {
              setPickerValue2(dayjs(val).format('MM-DD'))
            }}
          />
        </div>
      </div>
      {/* 中间内容 */}
      <List>
        <div className={style.contaner}>
          <PullToRefresh
            onRefresh={async () => {
              getAmountList(queryAmount)
            }}
            renderText={(status) => {
              return <div>{statusRecord[status]}</div>
            }}
          >
            <div className={style.contanerBoxList}>
              {amountList.map((item: any) =>
                item.amountBos.length != 0 ? (
                  <Card
                    className={style.contanerCar}
                    title={item.createDate}
                    key={item.createDate}
                    extra={
                      <div className={style.extra}>
                        <Image src={zhiImgSrc} width={15} height={15} fit="cover" style={{ borderRadius: 4 }} />
                        <div>{item.expend}</div>
                        <Image src={shouImgSrc} width={15} height={15} fit="cover" style={{ borderRadius: 4 }} />
                        <div>{item.income}</div>
                      </div>
                    }
                  >
                    {item.amountBos.map((item: any) => (
                      <div className={style.carItemList} key={item.createTime}>
                        <div className={style.carItem}>
                          <div>{item.remark}</div>
                          <div
                            style={{
                              color: item.amountType === 0 ? '#fdacac' : '#97b2ff',
                            }}
                          >
                            {item.amountType === 0 ? '-' + item.amount : '+' + item.amount}
                          </div>
                        </div>
                        <div className={style.carItemTime}>{dayjs(item.createTime).format('HH:mm')}</div>
                      </div>
                    ))}
                  </Card>
                ) : (
                  ' '
                )
              )}
            </div>
          </PullToRefresh>
        </div>
      </List>
      {/* 固定编辑按钮 */}
      <div
        className={style.editIcon}
        onClick={() => {
          setVisibleAccountEdit(true)
          handleSwitchKaType(0)
        }}
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
        bodyStyle={{ height: '85vh' }}
        onClose={() => setVisibleAccountEdit(false)}
      >
        {mockContentEdit}
      </Popup>
    </>
  )
}
