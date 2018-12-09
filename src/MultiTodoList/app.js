/**
 * @project: 主业务逻辑页面
 * @author: lee
 * @date: 2018-10-08
 */
import React, { Component } from "react";
import { NavBar, Icon, WhiteSpace, Button, Checkbox, List, Card} from 'antd-mobile';
import { Form, Table} from 'antd';
const dataSource = [{
	title: '胡彦斌的进出申请',
	applyId: '胡彦斌',
	time: '2017-9-18',
  }, {
	title: '汪聚湖的进出申请',
	applyId: '汪聚湖',
	time: '2019-7-15',
  }];
  
  const columns = [{
	title: '标题',
	dataIndex: 'title',
	key: 'title',
  }, {
	title: '申请人',
	dataIndex: 'applyId',
	key: 'applyId',
  }, {
	title: '申请时间',
	dataIndex: 'time',
	key: 'time',
  }]
class RegistrationForm extends Component {
	constructor (props) {
		super(props)
		this.state = {
			confirmDirty: false,
			autoCompleteResult: [],
			showalendar: false
		};
	}
	render() {
		return (
			<div className="global">
			<div className="header">
				<NavBar
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => console.log('onLeftClick')}
					rightContent={[
						<Icon key="0" type="search" style={{ marginRight: '16px' }} />,
						<Icon key="1" type="ellipsis" />,
					]}
					>已办结的</NavBar>
			</div>
			<div className="body">
				<div>
					<h3 style={{color: 'rgb(0, 153, 255)'}}>人员进出机房申请</h3>
					<Table bordered={true} pagination={false} dataSource={dataSource} columns={columns} />
				</div>
				<WhiteSpace></WhiteSpace>
				<div>
					<h3 style={{color: 'rgb(0, 153, 255)'}}>其它（故障申报类）</h3>
					<Table bordered={true} pagination={false} dataSource={dataSource} columns={columns} />
				</div>
			</div>
			</div>
		);
	}
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm
