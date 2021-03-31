import React, {
  useCallback,
} from 'react';
import ReactDom from 'react-dom';
import './index.less';

function PayError() {
  const handleClick = useCallback(() => {
    window.location.replace('/');
  }, []);
  return (
    <div className="error-wrap">
      <i />
      <p>支付失败</p>
      <a href="javascript:;" onClick={handleClick}>返回首页</a>
    </div>
  );
}

ReactDom.render(<PayError />, document.getElementById('app'));
