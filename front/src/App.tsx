import Layout from './Layout';
import { useEffect } from 'react'
import { getInfo, getUserById } from './api/user'
import { useAppDispatch } from './hooks/reDefine'
import { initUserInfo, changeLoginStatus } from './store/userSlice'
import { message } from 'antd'

function App() {

  const dispatch = useAppDispatch()

  // 加载根组件的时候，需要恢复用户的登录状态
  useEffect(() => {
    async function fetchData() {
      const result = await getInfo();
      if (result.data) {
        // 说明 token 有效
        // 获取该 id 对应的用户信息，存储到状态仓库
        const { data } = await getUserById(result.data._id);
        // 存储到状态仓库
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
      } else {
        // 说明 token 过期了
        message.warning('token过期了');
        localStorage.removeItem("userToken");
      }
    }
    if (localStorage.getItem("userToken")) {
      fetchData();
    }

  }, [])
  return (
    <div className="App">
      <Layout></Layout>
    </div>
  );
}

export default App;
