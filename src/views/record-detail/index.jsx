import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Modal } from 'antd-mobile';
import { useLocation } from 'react-router-dom';
import ajax from '../../utils/request';
import './index.less';

function RecordDetail() {
  const [list, setList] = useState([]);
  const location = useLocation();

  const renderMsg = useCallback((item) => (
    <div
      className={
        classnames({
          'msg-item': true,
          'sent-by-myselft': item.flag === '2',
        })
      }
    >
      <dl key={item.id}>
        <dt />
        <dd>
          <p>{item.content}</p>
        </dd>
      </dl>
    </div>
  ), []);

  useEffect(() => {
    console.log(location)
    const { data } = location.state;
    setList(data.data);
  }, [location]);

  useEffect(() => {
    ajax({
      url: '/wx/getTips',
    }).then(({ data }) => {
      if (data.code === 0) {
        const { result } = data;
        Modal.alert('', `${result.tipsTitle}\n${result.tipsUrl}`, [
          { text: '关闭' },
          {
            text: '复制链接',
            onPress() {
              const input = document.createElement('input');
              input.cssText = 'position: fixed; left: 0; top: 0; z-index: -99999;';
              input.readyOnly = true;
              input.value = result.tipsUrl;
              document.body.appendChild(input);
              input.select();
              document.execCommand('copy');
              document.body.removeChild(input);
            },
          },
        ]);
      }
    });
  }, []);

  useEffect(() => {
    if (list.length) {
      const $msg = document.querySelectorAll('.msg-item');
      const $last = $msg[$msg.length - 1];
      $last.scrollIntoView(false);
    }
  }, [list]);

  return (
    <div className="record-detail-wrap">
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
