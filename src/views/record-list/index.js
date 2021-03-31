import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import ReactDom from 'react-dom';
import { Toast } from 'antd-mobile';
import request from '../../utils/request';
import draw from './draw';

import './index.less';

function RecordList() {
  const [list, setList] = useState([]);
  const [errText, setErrText] = useState('');
  const $modal = useRef();
  const handleViewDetail = useCallback((id) => {
    window.location.href = `/record-detail?id=${id}`;
  }, []);
  const getList = useCallback(() => (
    request({
      url: '/wx/getChatRecord',
    }).then(({ data }) => {
      if (data.code === 0) {
        if (data.result && data.result.length) {
          setList(data.result);
          sessionStorage.setItem('chatRecord', JSON.stringify(data.result));
        } else {
          setErrText('未找到历史消息');
        }
        return;
      }
      Toast.info(data.message);
    })
  ), []);
  useEffect(() => {
    let chatRecord = sessionStorage.getItem('chatRecord');
    if (chatRecord) {
      chatRecord = JSON.parse(chatRecord);
    }
    if (Array.isArray(chatRecord)) {
      setList(chatRecord);
      return null;
    }
    const cb = draw();
    getList();
    return cb;
  }, []);

  return (
    <div className="record-list-wrap">
      <div className="action-modal" data-selector="modal" ref={$modal}>
        <span data-selector="str" />
        <span data-selector="point" />
      </div>
      {
        list.length ? (
          list.map((item, index) => (
            <div
              tabIndex="0"
              role="button"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="record-item"
              onClick={() => handleViewDetail(index)}
            >
              <div className="record-item-img" />
              <dl>
                <dt>
                  <span className="record-item-name">{item.name}</span>
                  {/* <span className="record-item-date">{item.date || '18：52'}</span> */}
                </dt>
                <dd>{item.title}</dd>
              </dl>
            </div>
          ))
        ) : (
          <p>{ errText }</p>
        )
      }
    </div>
  );
}

ReactDom.render(<RecordList />, document.getElementById('app'));
