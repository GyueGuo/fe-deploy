import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './index.less';

function RecordDetail() {
  const [list, setList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();
  const handleBack = useCallback(() => {
    history.goBack();
  }, []);
  const renderMsg = useCallback((item) => {
    if (item.msg) {
      return (
        <dl key={item.id}>
          <dt>
            <img src={userInfo.img} alt=""/>
          </dt>
          <dd>
            <i />
            {item.msg || 'sadadjajdlajldjaldjlkajkldjalkjdla'}
          </dd>
        </dl>
      );
    }
    return (
      <div className="msg-date">2020年 12月 1日</div>
    );
  }, [userInfo]);
  useEffect(() => {
    setList([{}, {}]);
    setUserInfo('');
  }, [setList]);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, false);
  // }, []);

  return (
    <div className="record-detail-wrap">
      <div className="user-wrap">
        <a href="javascript:;" onClick={handleBack} />
        <span>
          {userInfo.name || '哈哈哈哈'}
        </span>
      </div>
      <div className="msg-wrap">
        <div className="msg-list">
          {
            list.map(renderMsg)
          }
        </div>
      </div>
    </div>
  );
}

export default RecordDetail;
