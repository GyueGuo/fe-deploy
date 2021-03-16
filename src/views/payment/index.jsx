import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Toast } from 'antd-mobile';
import classnames from 'classnames';

import ajax from '../../utils/request';

import '../register/index.less';
import './index.less';

function Payment() {
  const history = useHistory();
  const [wx, setWx] = useState('');
  const [periodList, setPeriodList] = useState([]);
  const [period, setPeriod] = useState(null);
  const price = useRef(10);

  const handleInputWx = useCallback((e) => {
    setWx(e.target.value.trim());
  }, []);
  const handlePay = useCallback(() => {
    if (wx && period !== null) {
      const token = sessionStorage.getItem('token') || '';
      ajax({
        url: '/wx/alipay/pay',
        data: {
          id: period,
        },
        headers: {
          token,
        },
      })
        .then(({ data }) => {
          document.open();
          document.write(data);
          document.close();
        });
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
    const token = sessionStorage.getItem('token') || '';
    if (!token) {
      Toast.info('请先登录');
      history.push('/login');
      return;
    }
    ajax({
      url: '/wx/getPriceDic',
      headers: {
        token,
      },
    }).then(({ data }) => {
      if (data.code === 0) {
        const list = data.result.map((item) => ({
          id: item.id,
          label: item.queryName,
          value: item.queryPrice,
        }));
        setPeriodList(list);
        setPeriod(list[0].id);
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
            className={
              classnames({
                'form-item': true,
                'period-item': true,
                active: item.id === period,
              })
            }
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
    </div>
  );
}

export default Payment;
