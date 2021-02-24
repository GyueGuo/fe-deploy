import React, { useCallback, useMemo, useState } from 'react';
// import axios from 'axios';
import './index.less';

function Register() {
  const [list, setList] = useState([]);

  return (
    <div className="record-list-wrap">
      {
        list.length ? (
          list.map((item) => (
            <div className="record-item">
              <img src="" alt="" />
              <dl>
                <dt></dt>
                <dd></dd>
              </dl>
              <span></span>
            </div>
          ))
        ) : (
          <div className="empty" />
        )
      }
    </div>
  );
}

export default Register;
