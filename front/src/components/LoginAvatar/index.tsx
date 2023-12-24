import React, { useState, useRef } from 'react'
// import BiliModal from '../BiliModal'
import styles from './LoginAvatar.module.scss'
import EntryItem from '../EntryItem'

import { Avatar, Modal, Popover, Form, Button, Input, message, Image, List } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '../../hooks/reDefine'
import type { FormInstance } from 'antd'
import { userLogin, getUserById } from '../../api/user'
import { initUserInfo, changeLoginStatus, clearUserInfo } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginAvatar(props: { [propName: string]: any }) {
  const { userInfo, isLogin } = useAppSelector((state) => state.user)
  // let content = null
  // let afterLoginContent = [
  //   { title: '免费看高清视频', _id: '1' },
  //   { title: '多端同步播放记录', _id: '2' },
  //   { title: '发布弹幕/视频', _id: '3' },
  //   { title: '热门番剧影视看不停', _id: '4' }
  // ]
  // let popoverChildren = null
  // let afterLoginList = afterLoginContent.map((item: Item) => (<EntryItem key={item._id} className={styles['login-tip-content-item']} dataSource={item} layout='row'></EntryItem>))
  // 登录表单的状态数据
	const [loginInfo, setLoginInfo] = useState({
		loginId: "",
		loginPwd: "",
		remember: false
	});
  const loginFormRef = useRef<FormInstance>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	
  // if(isLogin) {
  //   content = (<div>111</div>)
  //   popoverChildren = (<Avatar className={styles['avatar']}></Avatar>)
  // } else {
  //   popoverChildren = (<div className={styles['avatar']}>登录</div>)
  //   content = (
  //     <div className={styles['login-panel-content']}>
  //       <p className={styles.title}>登录后你可以</p>
  //       <div className={styles['login-tip-content']}>
  //         {afterLoginList}
  //       </div>
  //     </div>
  //   )
  // }

	let loginStatus = null;
	if (isLogin) {
		// 登录了的
		const content = (
			<List
				dataSource={["个人中心", "退出登录"]}
				size="large"
				renderItem={(item) => {
					return (
						<List.Item style={{ cursor: "pointer" }} onClick={() => listClickHandle(item)}>{item}</List.Item>
					)
				}}
			/>
		);
		loginStatus = (
			<Popover content={content} trigger="hover" placement="bottom">
				<div className={styles.avatarContainer}>
					{/* <Avatar src={<Image src={userInfo.avatar} preview={false} />} size="large" icon={<UserOutlined />} /> */}
					<Avatar src={<Image preview={false} />} size="large" icon={<UserOutlined />} />
				</div>
			</Popover>
		);
	} else {
		// 没有登录
		loginStatus = (
			<Button type="primary" size="large" onClick={() => setIsModalOpen(true)}>注册/登录</Button>
		);
	}

	function listClickHandle(item: any) {
		if (item === "个人中心") {
			// 跳转到个人中心
			navigate('/personal')
		} else {
			// 退出登录
			// 清除 token
			localStorage.removeItem("userToken");
			// 清除状态仓库
			dispatch(clearUserInfo);
			dispatch(changeLoginStatus(false));
			navigate("/");
		}
	}

  // 登录函数
  async function handleLogin() {
    const result = await userLogin(loginInfo);
		if (result.data) {
			// 验证码是正确的
			// 接下来会有这么几种情况 （1）密码不正确 （2）账户被冻结 （3）账户正常，能够正常登录
			const data = result.data;
			if (!data.data) {
				// 账号密码不正确
				message.error("账号或密码不正确");
			} else if (!data.data.enabled) {
				// 账号被禁用了
				message.warning("账号被禁用");
			} else {
				// 说明账号密码正确，能够登录
				// 存储 token
				localStorage.userToken = data.token;
				// 将用户的信息存储到状态仓库，方便后面使用
				const result = await getUserById(data.data._id);
				dispatch(initUserInfo(result.data));
				dispatch(changeLoginStatus(true));
				handleCancel();
			}
		} else {
			// message.warning(result.msg);
			console.log('msg');
		}
  }

	function handleCancel() {
		// 清空上一次的内容
		setLoginInfo({
			loginId: "",
			loginPwd: "",
			remember: false
		})
		// props.closeModal();
		setIsModalOpen(false)
	}

  function updateInfo(oldInfo: any, newContent: string | boolean, key: string) {
		const obj = { ...oldInfo };
		obj[key] = newContent;
		setLoginInfo(obj);
	}

	// 弹框取消展示
	function handleModalCancel() {
		setIsModalOpen(false)
		props.cancel(false)
	}

  return (
    <div className={styles.container}>
      {/* <div className={styles['avatar-container']} onClick={() => setIsModalOpen(userInfo ? false : true)}>
        <Popover content={content} trigger='hover'>
          {popoverChildren}
        </Popover>
      </div> */}

			{loginStatus}

      <Modal footer={false} title='登录' open={isModalOpen || props.show} onOk={() => setIsModalOpen(false)} onCancel={handleModalCancel}>
      	<Form
					name="basic1"
					autoComplete="off"
					ref={loginFormRef}
					onFinish={handleLogin}
				>
					<Form.Item
						label="登录账号"
						name="loginId"
						rules={[
							{
								required: true,
								message: "请输入账号",
							},
						]}
					>
						<Input
							placeholder="请输入你的登录账号"
							value={loginInfo.loginId}
							onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId')}
						/>
					</Form.Item>

					<Form.Item
						label="登录密码"
						name="loginPwd"
						rules={[
							{
								required: true,
								message: "请输入密码",
							},
						]}
					>
						<Input.Password
							placeholder="请输入你的登录密码，新用户默认为123456"
							value={loginInfo.loginPwd}
							onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd')}
						/>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 5,
							span: 16,
						}}
					>
						<Button
							type="primary"
							htmlType="submit"
							style={{ marginRight: 20 }}
						>
							登录
						</Button>
						<Button type="primary" htmlType="submit">
							重置
						</Button>
					</Form.Item>
				</Form>
      </Modal>
    </div>
  )
}
