/**
 * @project: 主业务逻辑页面
 * @author: lee
 * @date: 2018-10-08
 */
import React, { Component } from "react";
import { NavBar, Icon, WhiteSpace, Button } from 'antd-mobile';
import { Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete} from 'antd';
const FormItem = Form.Item;
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
					>其他（如故障申报类）</NavBar>
			</div>
			<div className="body">
				<Form onSubmit={this.handleSubmit.bind(this)}>
					<FormItem
					required
					{...formItemLayout}
					label="标题"
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
					{...formItemLayout}
					label="申请人"
					>
					{getFieldDecorator('password', {
						rules: [{
						required: true, message: 'Please input your password!',
						}, {
						validator: this.validateToNextPassword,
						}],
					})(
						<Input type="password" />
					)}
					</FormItem>
					<FormItem
					required
					{...formItemLayout}
					label="联系电话"
					>
						{getFieldDecorator('confirm', {
							rules: [{
							required: true, message: 'Please confirm your password!',
							}, {
							validator: this.compareToFirstPassword,
							}],
						})(
							<Input addonBefore={prefixSelector} style={{ width: '100%' }} />
						)}
					</FormItem>
					<FormItem
					required
					{...formItemLayout}
					label='所属单位/部门'
					>
						{getFieldDecorator('nickname', {
							rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
						})(
							<Input />
						)}
					</FormItem>
					<FormItem
					required
					{...formItemLayout}
					label="移动接口人"
					>
						{getFieldDecorator('residence', {
							initialValue: ['alibaba', 'hangzhou', 'mayun'],
							rules: [{required: true, message: '请输入移动接口人' }],
						})(
							<Input />
						)}
					</FormItem>
					<FormItem
					required
					{...formItemLayout}
					label="需求说明"
					>
						<TextArea placeholder="请填写需求说明" autosize />
					</FormItem>
					<FormItem
					{...formItemLayout}
					label="备注"
					>
						<TextArea placeholder="请填写备注" autosize />
					</FormItem>
				</Form>
				<WhiteSpace size="lg"/>
				<Button type="primary">提交</Button>
				<WhiteSpace size="md"/>
				<Button type="primary">关闭</Button>
				<WhiteSpace size="lg"/>
				</div>
			</div>
		);
	}
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm
