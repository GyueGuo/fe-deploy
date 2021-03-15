import React, {
  useCallback, useEffect,
} from 'react';
import ajax from '../../utils/request';

import './index.less';

const { location } = window;

function PayFrames() {
  useEffect(() => {
    // ajax({
    //   url: '/wx/getPriceDic',
    // }).then(({ data }) => {
    //   if (data.code === 0) {
    //     setPeriodList(data.result.map((item) => ({
    //       id: item.id,
    //       label: item.queryPrice,
    //       value: item.queryName,
    //     })));
    //     return;
    //   }
    //   Toast.info(data.message);
    // });
  }, []);
  return (
    <div className="payframes-wrap">
      <canvas />
    </div>
  );
}

export default PayFrames;
