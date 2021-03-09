import React, { useCallback, useMemo, useState } from 'react';
import { Toast } from 'antd-mobile';
import ajax from '../../utils/request';
import './index.less';

function Register() {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const handleRegister = useCallback(() => {
    ajax({
      url: '/wx/register',
      data: {
        userName: username,
        userPassord: pwd,
      },
    }).then((res) => {
      if (res.code === 0) {
        window.location.href = '/';
        Toast.info(res.message);
        return;
      }
      Toast.info(res.message);
    });
  }, []);
  const handleUsernameInput = useCallback((e) => {
    setUsername(e.target.value.trim());
  }, []);
  const handlePwdInput = useCallback((e) => {
    setPwd(e.target.value.trim());
  }, []);
  const handleRepeatPwdInput = useCallback((e) => {
    setRepeatPwd(e.target.value.trim());
  }, []);
  const isBtnDisabled = useMemo(() => (
    !username || !pwd || !repeatPwd
  ), [username, pwd, repeatPwd]);

  return (
    <div className="form-wrap">
      <div className="form-item">
        <input value={username} placeholder="请输入用户名" onInput={handleUsernameInput} />
      </div>
      <div className="form-item">
        <input value={pwd} placeholder="请输入密码" onInput={handlePwdInput} />
      </div>
      <div className="form-item">
        <input value={repeatPwd} placeholder="请再次输入密码" onInput={handleRepeatPwdInput} />
      </div>
      <button className="form-submit" type="button" disabled={isBtnDisabled} onClick={handleRegister}>注册</button>
      <div className="form-entries-wrap">
        <a href="/login">去登录</a>
      </div>
    </div>
  );
}

export default Register;
