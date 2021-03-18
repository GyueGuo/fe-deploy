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
  const context = useContext(Context);
  const $modal = useRef();
  const history = useHistory();
  const handleViewDetail = useCallback((data) => {
    history.push('/record-detail', {
      data,
    });
  }, []);

  useEffect(() => {
    const cb = draw();
    const { token } = context.state;
    request({
      url: '/wx/getChatRecord',
      headers: {
        token,
      },
    }).then(({ data }) => {
      if (data.code === 0) {
        setList(data.result);
        return;
      }
      Toast.info(data.message);
    });
    return () => {
      cb();
    };
  }, []);

  return (
    <div className="record-list-wrap">
      <div className="action-modal" ref={$modal}>
        <span data-selector="modal" />
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
              {/* <div className="record-item-img">
                <img src={item.img} alt="" />
              </div> */}
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
          <div className="empty" />
        )
      }
    </div>
  );
}

export default RecordList;
