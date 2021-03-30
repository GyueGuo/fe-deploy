import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Toast } from 'antd-mobile';
import classnames from 'classnames';

import ajax from '../../utils/request';
import { wxReg } from '../../utils/utils';
import './index.less';

const isIos = () => (!!navigator.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));

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
      Toast.loading('', 10000);
      ajax({
        url: '/wx/alipay/pay',
        data: {
          id: period,
        },
      })
        .then((res) => {
          console.log(res);
          const { data } = res;
          Toast.hide();
          const div = document.createElement('div');
          div.id = 'formWrap';
          div.style.display = 'none';
          try {
            const [html] = data.match(/<form[\s\S]+<\/form>/);
            div.innerHTML = html;
            document.body.appendChild(div);
            document.forms[0].submit();
          } catch (e) {
            Toast.info('提单失败，请重试');
          }
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
  useEffect(() => {
    if (isIos) {
      const reload = (e) => {
        if (
          e.persisted
          || (
            window.performance && window.performance.navigation.type === 2
          )
        ) {
          const $div = document.getElementById('formWrap');
          if ($div) {
            $div.parentNode.removeChild($div);
          }
        }
      };
      window.addEventListener('pageshow', reload, false);
      return () => {
        window.removeEventListener('pageshow', reload, false);
      };
    }
    return null;
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
