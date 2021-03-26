import React, {
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import './index.less';

function PayError() {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.replace('/');
  }, []);
  return (
    <div className="error-wrap">
      <i />
      <p>支付失败</p>
      <a href="javascript:;" onClick={handleClick}>返回首页</a>
    </div>
  );
}

export default PayError;
