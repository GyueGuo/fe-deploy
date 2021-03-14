import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Icon, Toast } from 'antd-mobile';
import ajax from '../../utils/request';
import draw from './draw';

import '../register/index.less';
import './index.less';

function Payment() {
  const [wx, setWx] = useState('');
  const [periodList, setPeriodList] = useState([]);
  const [period, setPeriod] = useState(null);
  const [isShowAction, setIsShowAction] = useState(false);
  const price = useRef(10);

  const handleInputWx = useCallback((e) => {
    setWx(e.target.value.trim());
  }, []);
  const handlePay = useCallback(() => {
    if (wx && period !== null) {
      setIsShowAction(true);
    }
  }, [wx, period]);
  const getPriceShow = useCallback((value) => (
    `￥${(value * price.current).toFixed(2)}`
  ), []);

  const handlePeriodClick = useCallback(({ id }) => (
    setPeriod(id)
  ), []);

  const isBtnDisabled = useMemo(() => (!wx || period === null), [wx, period]);

  useEffect(() => {
    if (isShowAction) {
      draw();
    }
  }, [isShowAction]);

  useEffect(() => {
    ajax({
      url: '/wx/getPriceDic',
      headers: {
        token: sessionStorage.getItem('token') || '',
      },
    }).then(({ data }) => {
      if (data.code === 0) {
        setPeriodList(data.result.map((item) => ({
          id: item.id,
          label: item.queryName,
          value: item.queryPrice,
        })));
        return;
      }
      Toast.info(data.message);
    });
  }, []);
  return (
    <div className="payment-wrap form-wrap">
      <div className="form-item">
        <input value={wx} placeholder="请输入微信号码" onInput={handleInputWx} />
      </div>
      {
        periodList.map((item) => (
          <div
            className="form-item period-item"
            key={item.id}
            role="button"
            tabIndex="0"
            onClick={() => handlePeriodClick(item)}
          >
            <span className="item-title">
              查询记录，
              { item.label }
            </span>
            <span className="item-price">{ getPriceShow(item.value) }</span>
            <Icon className="item-icon" type={item.id === period ? 'check' : 'radio'} size="sm" />
          </div>
        ))
      }
      <button className="form-submit" type="button" disabled={isBtnDisabled} onClick={handlePay}>支付</button>
      {
        isShowAction ? (
          <div className="action-modal">
            <span data-selector="modal" />
            <span data-selector="point" />
          </div>
        ) : null
      }
    </div>
  );
}

export default Payment;
