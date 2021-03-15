import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Icon, Toast } from 'antd-mobile';
import ajax from '../../utils/request';

import '../register/index.less';
import './index.less';

const { location } = window;

function Payment() {
  const [wx, setWx] = useState('');
  const [periodList, setPeriodList] = useState([]);
  const [period, setPeriod] = useState(null);
  const price = useRef(10);

  const handleInputWx = useCallback((e) => {
    setWx(e.target.value.trim());
  }, []);
  const handlePay = useCallback(() => {
    if (wx && period !== null) {
      ajax({
        url: '/wx/alipay/pay',
        data: {
          wx,
          id: period,
        },
        headers: {
          token: sessionStorage.getItem('token') || '',
        },
      })
        .then(({ data }) => {
          console.log(data);
          location.href = `https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=${payId}&package=1037687096&redirect_url=${encodeURIComponent(`${location.origin}/payframes`)}`;
        });
    }
  }, [wx, period]);

  const getPriceShow = useCallback((value) => (
    `￥${(value * price.current).toFixed(2)}`
  ), []);

  const handlePeriodClick = useCallback(({ value }) => (
    setPeriod(value)
  ), []);

  const isBtnDisabled = useMemo(() => (!wx || period === null), [wx, period]);

  useEffect(() => {
    ajax({
      url: '/wx/getPriceDic',
    }).then(({ data }) => {
      if (data.code === 0) {
        setPeriodList(data.result.map((item) => ({
          id: item.id,
          label: item.queryPrice,
          value: item.queryName,
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
            onClick={handlePeriodClick(item)}
          >
            <span className="item-title">
              查询记录，
              { item.label }
            </span>
            <span className="item-price">{ getPriceShow(item.value) }</span>
            <Icon className="item-icon" type="right" size="sm" />
          </div>
        ))
      }
      <button className="form-submit" type="button" disabled={isBtnDisabled} onClick={handlePay}>支付</button>
    </div>
  );
}

export default Payment;
