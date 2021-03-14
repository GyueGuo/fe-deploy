import React, {
  useCallback, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import ajax from '../../utils/request';
import './index.less';

function Register() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const handleRegister = useCallback(() => {
    if (repeatPwd !== pwd) {
      Toast.info('两次输入密码不一致');
      return;
    }
    ajax({
      url: '/wx/register',
      data: {
        userName: username,
        userPassord: pwd,
      },
    }).then(({ data, headers }) => {
      if (data.code === 0) {
        Toast.info('注册成功');
        sessionStorage.setItem('token', headers.token);
        history.push('/');
        return;
      }
      Toast.info(data.message);
    });
  }, [username, pwd, repeatPwd]);
  const handleUsernameInput = useCallback((e) => {
    setUsername(e.target.value.trim());
  }, []);
  const handlePwdInput = useCallback((e) => {
    setPwd(e.target.value.trim());
  }, []);
  const handleRepeatPwdInput = useCallback((e) => {
    setRepeatPwd(e.target.value.trim());
  }, []);
  const handleGoLogin = useCallback(() => {
    history.push('/login');
  }, []);
  const handleGoViewAgreement = useCallback(() => {
    history.push('/agreement');
  }, []);
  const isBtnDisabled = useMemo(() => (
    !username || !pwd || !repeatPwd
  ), [username, pwd, repeatPwd]);

  return (
    <div className="form-wrap">
      <div className="form-item">
        <input
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
      <div className="form-item">
        <input
          type="password"
          autoComplete="off"
          value={repeatPwd}
          placeholder="请再次输入密码"
          onInput={handleRepeatPwdInput}
        />
      </div>
      <button className="form-submit" type="button" disabled={isBtnDisabled} onClick={handleRegister}>注册</button>
      <div className="form-entries-wrap">
        <a href="javascript:;" onClick={handleGoLogin}>去登录</a>
      </div>
      <a href="javascript:;" className="agreement-link" onClick={handleGoViewAgreement}>《服务协议》</a>
    </div>
  );
}

export default Register;
