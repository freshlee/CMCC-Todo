/**
 * @project: 主业务逻辑页面
 * @author: lee
 * @date: 2018-10-08
 */
import React, { Component } from "react";
import { NavBar, Icon, WhiteSpace, Button, Checkbox, List, Calendar} from 'antd-mobile';
import { Form, Input, Tooltip, Cascader, Select, Row, Col, AutoComplete} from 'antd';
const {CheckboxItem} = Checkbox
const FormItem = Form.Item;
const ListItem = List.Item
const Option = Select.Option;
const {TextArea} = Input
const AutoCompleteOption = AutoComplete.Option;
const residences = [{
	value: 'zhejiang',
	label: 'Zhejiang',
	children: [{
	  value: 'hangzhou',
	  label: 'Hangzhou',
	  children: [{
		value: 'xihu',
		label: 'West Lake',
	  }],
	}],
  }, {
	value: 'jiangsu',
	label: 'Jiangsu',
	children: [{
	  value: 'nanjing',
	  label: 'Nanjing',
	  children: [{
		value: 'zhonghuamen',
		label: 'Zhong Hua Men',
	  }],
	}],
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
	
	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
			console.log('Received values of form: ', values);
			}
		});
	}

	handleConfirmBlur (e) {
	const value = e.target.value;
	this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	compareToFirstPassword (rule, value, callback) {
	const form = this.props.form;
	if (value && value !== form.getFieldValue('password')) {
		callback('Two passwords that you enter is inconsistent!');
	} else {
		callback();
	}
	}

	validateToNextPassword (rule, value, callback) {
	const form = this.props.form;
	if (value && this.state.confirmDirty) {
		form.validateFields(['confirm'], { force: true });
	}
	callback();
	}

	handleWebsiteChange (value) {
	let autoCompleteResult;
	if (!value) {
		autoCompleteResult = [];
	} else {
		autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
	}
	this.setState({ autoCompleteResult });
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { autoCompleteResult } = this.state;
	
		const formItemLayout = {
		  labelCol: {
			xs: { span: 24 },
			sm: { span: 8 },
		  },
		  wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 },
		  },
		};
		const tailFormItemLayout = {
		  wrapperCol: {
			xs: {
			  span: 24,
			  offset: 0,
			},
			sm: {
			  span: 16,
			  offset: 8,
			},
		  },
		};
		const prefixSelector = getFieldDecorator('prefix', {
		  initialValue: '86',
		})(
		  <Select style={{ width: 70 }}>
			<Option value="86">+86</Option>
			<Option value="87">+87</Option>
		  </Select>
		);
	
		const websiteOptions = autoCompleteResult.map(website => (
		  <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
		));
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
				<Form onSubmit={this.handleSubmit.bind(this)}>
					<FormItem
					required
					label="姓名"
					>
					{getFieldDecorator('email', {
						rules: [{
						type: 'email', message: 'The input is not valid E-mail!',
						}, {
						required: true, message: 'Please input your E-mail!',
						}],
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
					required
					label="身份证号码"
					>
					{getFieldDecorator('id', {
						rules: [{
						required: true, message: '请输入您的身份证号码',
						}, {
						validator: this.validateToNextPassword,
						}],
					})(
						<Input type="password" />
					)}
					</FormItem>
					<FormItem
					required
					label="联系电话"
					>
						{getFieldDecorator('confirm', {
							rules: [{
							required: true, message: '请输入您的联系电话',
							}],
						})(
							<Input placeholder="请输入您的联系电话" />
						)}
					</FormItem>
					<FormItem
					required
					label="类型"
					>
							<Select>
								<Option key="yidong">移动方</Option>
								<Option key="dianxin">电信方</Option>
							</Select>
					</FormItem>
					<FormItem
					required
					label='所属单位/部门'
					>
						{getFieldDecorator('nickname', {
							rules: [{ required: true, message: '请输入所属单位/部门', whitespace: true }],
						})(
							<Input placeholder="请输入所属单位/部门"/>
						)}
					</FormItem>
					<FormItem
					required
					label="是否携带电脑"
					>
							<Select>
								<Option key="Y">是</Option>
								<Option key="N">否</Option>
							</Select>
					</FormItem>
					<FormItem
					required
					label="园区IAP工作流单号"
					>
						{getFieldDecorator('residence', {
							rules: [{required: true, message: '请输入单号' }],
						})(
							<Input placeholder="请输入单号" />
						)}
					</FormItem>
				</Form>
				<WhiteSpace size="lg"/>
				<Button type="primary">保存并继续添加</Button>
				<WhiteSpace size="md"/>
				<Button type="primary">保存并关闭</Button>
				<WhiteSpace size="lg"/>
				</div>
				<Calendar show={this.state.showalendar}></Calendar>
			</div>
		);
	}
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm
