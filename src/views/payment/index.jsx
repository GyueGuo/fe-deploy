import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Icon } from 'antd-mobile';
import '../register/index.less';
import './index.less';

function Payment() {
  const [wx, setWx] = useState('');
  const [periodList, setPeriodList] = useState([]);
  const [isShowAction, setIsShowAction] = useState(false);
  const price = useRef(10);

  const handleInputWx = useCallback((e) => {
    setWx(e.target.value.trim());
  }, []);
  const handlePay = useCallback(() => {
    // if (wx && period) {
    setIsShowAction(true);
    // }
  }, []);

  const draw = useCallback(() => {
    const str = 'Thank you for using, we are trying to get the records from remote, please be patient and wait a few second';
    const arr = str.split('');
    let index = 0;
    const max = arr.length;
    let pointCounter = 0;
    const drawPoint = () => {
      const dom = document.querySelector('[data-selector="point"]');
      let pstr = '';
      let target = parseInt(pointCounter, 10);
      while (target) {
        pstr += '.';
        target -= 1;
      }
      pointCounter += 0.1;
      if (pointCounter > 5) {
        pointCounter = 0;
      }
      dom.innerHTML = pstr;
      requestAnimationFrame(drawPoint);
    };
    const drawFn = () => {
      const dom = document.querySelector('[data-selector="modal"]');
      if (dom) {
        dom.innerHTML = arr.slice(0, index).join('');
        index += 1;
        if (index > max) {
          requestAnimationFrame(drawPoint);
          return;
        }
      }
      requestAnimationFrame(drawFn);
    };
    requestAnimationFrame(drawFn);
  }, []);

  const getPriceShow = useCallback((value) => (
    `￥${(value * price.current).toFixed(2)}`
  ), []);

  const isBtnDisabled = useMemo(() => (!wx), [wx]);

  useEffect(() => {
    if (isShowAction) {
      draw();
    }
  }, [isShowAction, draw]);

  useEffect(() => {
    setPeriodList([{
      value: 1,
      label: '30天',
    }, {
      value: 2,
      label: '3月内',
    }, {
      value: 3,
      label: '1年内',
    }]);
  }, []);
  return (
    <div className="payment-wrap form-wrap">
      <div className="form-item">
        <input value={wx} placeholder="请输入微信号码" onInput={handleInputWx} />
      </div>
      {
        periodList.map((item) => (
          <div className="form-item period-item" key={item.value}>
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
