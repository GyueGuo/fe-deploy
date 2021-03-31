import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Modal, Toast } from 'antd-mobile';
import ReactDom from 'react-dom';
import ajax from '../../utils/request';
import './index.less';

function RecordDetail() {
  const [list, setList] = useState([]);
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
    let chatRecord = sessionStorage.getItem('chatRecord');
    if (chatRecord) {
      chatRecord = JSON.parse(chatRecord);
      const id = window.location.search.match(/\?id=(\d+)/)[1];
      if (id && (id - 0) < chatRecord.length) {
        setList(chatRecord[id - 0].data);
      }
    }
  }, []);

  useEffect(() => {
    ajax({
      url: '/wx/getTips',
    }).then(({ data }) => {
      if (data.code === 0) {
        const { result } = data;
        Modal.alert('',
          (
            <div>
              <p>{result.tipsTitle}</p>
              <input value={result.tipsUrl} readOnly className="clip-input" />
            </div>
          ),
          [
            { text: '关闭' },
            {
              text: '复制链接',
              onPress() {
                try {
                  const input = document.createElement('input');
                  input.cssText = 'position: fixed; left: 0; top: -200px; z-index: -99999;';
                  input.readyOnly = true;
                  input.value = result.tipsUrl;
                  document.body.appendChild(input);
                  input.focus();
                  input.setSelectionRange(0, result.tipsUrl.length);
                  document.execCommand('copy');
                  document.body.removeChild(input);
                  Toast.info('已复制');
                } catch (e) {
                  Modal.alert(
                    '',
                    (
                      <div>
                        <p>复制失败，请手动复制链接</p>
                        <input value={result.tipsUrl} readOnly className="clip-input" />
                      </div>
                    ), [
                      { text: '关闭' },
                    ],
                  );
                }
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

ReactDom.render(<RecordDetail />, document.getElementById('app'));
