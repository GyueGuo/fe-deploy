import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { Modal } from 'antd-mobile';

import ajax from '../../utils/request';
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
        <div
          className={
            classnames({
              'msg-item': true,
              'sent-by-myselft': item.sentByMe,
            })
          }
        >
          <dl key={item.id}>
            <dt>
              <img src={userInfo.img} alt="" />
            </dt>
            <dd>
              <p>{item.msg}</p>
            </dd>
          </dl>
        </div>
      );
    }
    return (
      <div className="msg-date">2020年 12月 1日</div>
    );
  }, [userInfo]);

  useEffect(() => {
    ajax({
      url: '/wx/getTips',
    }).then(({ data }) => {
      if (data.code === 0) {
        const { result } = data;
        Modal.alert('', result.tipsTitle, [
          { text: '关闭' },
          {
            text: '确定',
            onPress() {
              window.location.href = result.tipsUrl;
            },
          },
        ]);
      }
    });
  }, []);

  return (
    <div className="record-detail-wrap">
      <div className="user-wrap">
        <a href="javascript:;" onClick={handleBack} role="button">&lt;</a>
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
