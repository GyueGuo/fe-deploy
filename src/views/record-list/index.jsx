import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './index.less';

function RecordList() {
  const [list, setList] = useState([]);
  const history = useHistory();
  const handleViewDetail = useCallback(({ id }) => {
    history.push('/record-detail', {
      id,
    });
  }, []);

  useEffect(() => {
    setList([{}, {}]);
  }, [setList]);

  return (
    <div className="record-list-wrap">
      {
        list.length ? (
          list.map((item) => (
            <div
              tabIndex="0"
              role="button"
              key={item.id}
              className="record-item"
              onClick={() => handleViewDetail(item)}
            >
              <div className="record-item-img">
                <img src={item.img} alt="" />
              </div>
              <dl>
                <dt>
                  <span className="record-item-name">{item.name || '11111111111111111'}</span>
                  <span className="record-item-date">{item.date || '18：52'}</span>
                </dt>
                <dd>{item.msg || '哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈'}</dd>
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
