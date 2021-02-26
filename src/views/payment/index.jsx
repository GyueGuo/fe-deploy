import React, { useCallback, useEffect, useState } from 'react';
import { Picker } from 'antd-mobile';
import './index.less';

function Payment() {
  const [wx, setWx] = useState('');
  const [periodList, setPeriodList] = useState([]);

  const handleInputWx = useCallback((e) => {
    setWx(e.target.value.trim());
  }, []);

  const handlePeriodChange = useCallback((e) => {
    // setPwd(e.target.value.trim());
    console.log(e);
  }, []);

  useEffect(() => {
    setPeriodList([{
      value: 1,
      label: '30天',
    }, {
      value: 1,
      label: '3月内',
    }, {
      value: 1,
      label: '1年内',
    }]);
  }, []);
  return (
    <div className="payment-wrap">
      <div className="form-item">
        <div className="form-label">
          微信号码
        </div>
        <div className="form-content">
          <input value={wx} placeholder="请输入" onInput={handleInputWx} />
        </div>
      </div>
      <div className="form-item">
        <div className="form-label">
          时间
        </div>
        <div className="form-content" role="button" tabIndex="0">
          <Picker onChange={handlePeriodChange} data={periodList} cols={1} />
        </div>
      </div>
    </div>
  );
}

export default Payment;
