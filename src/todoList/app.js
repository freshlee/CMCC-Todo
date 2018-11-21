/**
 * @project: 主业务逻辑页面
 * @author: lee
 * @date: 2018-10-08
 */

import React, { Component } from "react";
import { NavBar, Icon } from 'antd-mobile';
import { Select } from 'antd';
export default class App extends Component {

	componentDidMount() {

	}

	render() {

		return (
			<div>
				<div className="index">
                    <NavBar
						icon={<Icon type="left"/>}
					>审批列表</NavBar>
					<div className="global">
						<div className="title-wrap">
							<div className="title">出差申请</div>
							<div className="panel">
								<Select defaultValue="lucy" style={{ width: 120 }}>
									<Select.Option value="jack">Jack</Select.Option>
									<Select.Option value="lucy">Lucy</Select.Option>
									<Select.Option value="disabled" disabled>Disabled</Select.Option>
									<Select.Option value="Yiminghe">yiminghe</Select.Option>
								</Select>
							</div>
						</div>
						<div className="card-wrap">
						{[1, 2, 3].map(item => {
							return (
								<div className="card">
								<p className="title">标题:XXXX</p>
								<div className="content">
								   <div className="content-item">申请时间: 2018-10-30</div>
								   <div className="content-item">申请状态: <span className="state">成功</span></div>
								</div>
							   </div>
							)
						})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
