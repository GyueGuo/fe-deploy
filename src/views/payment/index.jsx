import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Toast } from 'antd-mobile';
import classnames from 'classnames';

import ajax from '../../utils/request';
import { wxReg } from '../../utils/utils';
import './index.less';

function Payment() {
  const history = useHistory();
  const [wx, setWx] = useState('');
  const [periodList, setPeriodList] = useState([]);
  const [period, setPeriod] = useState(null);

  const handleInputWx = useCallback((e) => {
    setWx(e.target.value.trim());
  }, []);
  const handlePay = useCallback(() => {
    if (wx && period !== null) {
      if (!(wxReg).test(wx)) {
        Toast.info('请输入正确格式的微信号');
        return;
      }
      ajax({
        url: '/wx/alipay/pay',
        data: {
          id: period,
        },
      })
        .then(({ data }) => {
          document.open();
          document.write(data);
          document.close();
        });
    }
  }, [wx, period]);

  const handlePeriodClick = useCallback(({ id }) => (
    setPeriod(id)
  ), []);

  const handleGoViewAgreement = useCallback(() => {
    history.push('/agreement');
  }, []);
  const isBtnDisabled = useMemo(() => (!wx || period === null), [wx, period]);

  useEffect(() => {
    ajax({
      url: '/wx/getPriceDic',
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

  return periodList.length ? (
    <div className="payment-wrap">
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
            <span className="item-title">数据查询</span>
            <span className="item-price">
              查询记录，
              { item.label }
            </span>
            <Icon className="item-icon" type={item.id === period ? 'check' : 'radio'} size="sm" />
          </div>
        ))
      }
      <button className="form-submit" type="button" disabled={isBtnDisabled} onClick={handlePay}>支付</button>
      <a href="javascript:;" className="agreement-link" onClick={handleGoViewAgreement}>《服务协议》</a>
    </div>
  ) : null;
}

export default Payment;
