import React, {
  useCallback, useEffect, useRef, useState, useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';

import Context from '../../store/context';
import request from '../../utils/request';
import draw from './draw';

import './index.less';

function RecordList() {
  const [list, setList] = useState([]);
  const [errText, setErrText] = useState('');
  const context = useContext(Context);
  const $modal = useRef();
  const history = useHistory();
  const handleViewDetail = useCallback((data) => {
    history.push({
      pathname: '/record-detail',
      state: {
        data,
      },
    });
  }, []);
  const getList = useCallback(() => (
    request({
      url: '/wx/getChatRecord',
    }).then(({ data }) => {
      if (data.code === 0) {
        if (data.result && data.result.length) {
          setList(data.result);
          context.dispatch({
            type: 'SET_CHART_RECORD',
            data: data.result,
          });
        } else {
          setErrText('未找到历史消息');
        }
        return;
      }
      Toast.info(data.message);
    })
  ), []);
  useEffect(() => {
    const { chartRecord } = context.state;
    if (Array.isArray(chartRecord)) {
      setList(chartRecord);
      return null;
    }
    const cb = draw();
    request({
      url: '/wx/getPayResult',
    }).then(({ data }) => {
      if (data.code === 0) {
        getList();
        return;
      }
      setErrText(data.message);
    });
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
              onClick={() => handleViewDetail(item)}
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

export default RecordList;
