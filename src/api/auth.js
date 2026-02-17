import { api } from '../lib/api';

export const fetchMyIdByUsername = async (username) => {
  try {
    const res = await api.get('/api/users/me/id', {
      params: { username },
    });
    return Number(res.data);
  } catch (error) {
    console.error('Error fetching my ID:', error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  const response = await api.post('api/users/login', { username, password });
  console.log('서버 응답 확인용:', response.data);
  localStorage.setItem('username', response.data.username);

  if (response.status === 200 || response.status === 201) {
    const uname = response.data.username ?? username;

    localStorage.setItem('username', uname);

    const myId = await fetchMyIdByUsername(uname);
    localStorage.setItem('myId', String(myId));

    return { ...response.data, memberId: myId };
  }

  throw new Error('Login Failed');
};

export const loginWithGoogle = async (idToken) => {
  const response = await api.post('api/users/login/google', { idToken });
  console.log('구글 로그인 서버 응답:', response.data);

  if (response.status === 200 || response.status === 201) {
    const uname = response.data.username;
    localStorage.setItem('username', uname);

    const myId = await fetchMyIdByUsername(uname);
    localStorage.setItem('myId', String(myId));

    return { ...response.data, memberId: myId };
  }

  throw new Error('Google Login Failed');
};

export const checkDuplicateApi = async (type, value) => {
  let CHECK_URL = '';

  if (type === 'nickname') {
    CHECK_URL = `api/users/check-nickname`;
  } else if (type === 'username') {
    CHECK_URL = `api/users/check-username`;
  } else if (type === 'email') {
    CHECK_URL = `api/users/check-email`;
  }

  const response = await api.get(CHECK_URL, {
    params: { [type]: value },
  });

  const { isAvailable, message } = response.data;
  const typeMap = {
    nickname: '닉네임',
    username: '아이디',
    email: '이메일',
  };
  const typeName = typeMap[type];

  const finalMessage =
    message ||
    (isAvailable
      ? `사용 가능한 ${typeName}입니다.`
      : `이미 존재하는 ${typeName}입니다.`);
  return {
    isAvailable,
    message: finalMessage,
  };
};

export const signupUser = async (formData) => {
  const typeMap = { 조용히: 'QUIET', 도란도란: 'CHATTY' };

  const response = await api.post('api/users/signup', {
    nickname: formData.nickname,
    username: formData.username,
    email: formData.email,
    password: formData.password,
    preferredType: typeMap[formData.preferredType],
    preferredMethod: formData.preferredMethod,
    activityArea: formData.activityArea,
    targetMessage: formData.targetMessage,
  });

  if (response.status === 201 || response.status === 200) {
    return response.data;
  }
  throw response;
};

