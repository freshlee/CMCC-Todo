/**
 * @project: 主业务逻辑页面
 * @author: lee
 * @date: 2018-10-08
 */
import React, { Component } from "react";
import { NavBar, Icon, WhiteSpace, Button, Checkbox, List, Card} from 'antd-mobile';
import { Form, AutoComplete} from 'antd';
const {CardHeader, CardBody} = Card;
const AutoCompleteOption = AutoComplete.Option;
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
					>机房进出人员添加</NavBar>
			</div>
				<div className="body">
					{/* <Card>
						<CardHeader
						title="姓名: 马云"
						extra={<span>出入人员</span>}
						></CardHeader>
						<CardBody>
							<div>
								<div>身份证号码: 8715346413245674654</div>
								<div>联系电话: 13878754129</div>
								<div>类型: 电信方</div>
								<div>所属单位/部门: 维护部</div>
								<div>是否携带电脑: 否</div>
								<div>园区IAP工作流单号: 87451978458759113</div>
							</div>
						</CardBody>
					</Card> */}
				<Card>
					<Card.Header
						title="姓名: 马云"
					/>
					<Card.Body>
						<div>
							<div>身份证号码: 8715346413245674654</div>
							<WhiteSpace size="sm"></WhiteSpace>
							<div>联系电话: 13878754129</div>
							<WhiteSpace size="sm"></WhiteSpace>
							<div>类型: 电信方</div>
							<WhiteSpace size="sm"></WhiteSpace>
							<div>所属单位/部门: 维护部</div>
							<WhiteSpace size="sm"></WhiteSpace>
							<div>是否携带电脑: 否</div>
							<WhiteSpace size="sm"></WhiteSpace>
							<div>园区IAP工作流单号: 87451978458759113</div>
						</div>
					</Card.Body>
				</Card>
				</div>
			</div>
		);
	}
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm
