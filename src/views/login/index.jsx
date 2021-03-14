import React, {
  useCallback, useMemo, useState,
} from 'react';
import { Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import ajax from '../../utils/request';

import '../register/index.less';

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const handleLogin = useCallback(() => {
    ajax({
      url: '/wx/login',
      data: {
        userName: username,
        userPassord: pwd,
      },
    }).then(({ data, headers }) => {
      if (data.code === 0) {
        Toast.info('登录成功');
        sessionStorage.setItem('token', headers.token);
        history.push('/');
        return;
      }
      Toast.info(data.message);
    });
  }, [username, pwd]);
  const handleUsernameInput = useCallback((e) => {
    setUsername(e.target.value.trim());
  }, []);
  const handlePwdInput = useCallback((e) => {
    setPwd(e.target.value.trim());
  }, []);
  const handleGoRegister = useCallback(() => {
    history.push('/register');
  }, []);
  const isBtnDisabled = useMemo(() => (
    !username || !pwd
  ), [username, pwd]);

  return (
    <div className="form-wrap">
      <div className="form-item">
        <input
          autoComplete="off"
          value={username}
          placeholder="请输入用户名"
          onInput={handleUsernameInput}
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          autoComplete="off"
          value={pwd}
          placeholder="请输入密码"
          onInput={handlePwdInput}
        />
      </div>
      <button className="form-submit" type="button" disabled={isBtnDisabled} onClick={handleLogin}>登录</button>
      <div className="form-entries-wrap">
        <a href="javascript:;" onClick={handleGoRegister}>去注册</a>
      </div>
    </div>
  );
}

export default Login;
