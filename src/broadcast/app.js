/**
 * @project: 主业务逻辑页面
 * @author: lee
 * @date: 2018-10-08
 */
import React, { Component } from "react";
import { NavBar, Icon, WhiteSpace, Button } from 'antd-mobile';
import { Form, Input, Tooltip, Cascader, Select, Row, Col, List, AutoComplete} from 'antd';
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
		const data = [
			'最让程序员自豪的事情是什么？',
			'人类有没有可能是被设计出来的？',
			'百万饭局门：清华校花靠舔上位？',
			'为什么说光速不能被超越？',
			'如何看待「快手」这个App？',
		]
	
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
					>公告</NavBar>
			</div>
			<div className="body">
					<h2 className="title">这里是内容</h2>
					<p>Nam id semper purus, sit amet scelerisque justo. Proin in blandit ligula. Nulla auctor aliquet ipsum, pulvinar tempus dolor maximus et. Quisque at velit vel nunc dignissim tincidunt. Phasellus vitae tempus tortor. Etiam nisi risus, tempus sit amet magna nec, luctus pellentesque enim. Nulla congue augue eu odio pretium, nec consectetur orci blandit. Proin </p>
					<WhiteSpace size="sm"></WhiteSpace>
					<List
						header={<div>今日公告</div>}
						bordered
						dataSource={data}
						renderItem={item => (<List.Item>{item}</List.Item>)}
					/>
			</div>
			</div>
		);
	}
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm
