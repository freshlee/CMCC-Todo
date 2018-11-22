/**
 * @project: 主业务逻辑页面
 * @author: lee
 * @date: 2018-10-08
 */

import React, { Component } from "react";
import { NavBar, Icon, List, InputItem, WhiteSpace, Button, Calendar, TextareaItem } from 'antd-mobile';
import { Select } from 'antd';
Date.prototype.format = function(format)
{
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(),    //day
	"h+" : this.getHours(),   //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
	"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,
	RegExp.$1.length==1 ? o[k] :
	("00"+ o[k]).substr((""+ o[k]).length));
 	return format;
}
function setFormData(value) {
	return function (target, key, descriptor) { // 此处 target 为 C.prototype; key 为 method;
	  // 原 descriptor 为：{ value: f, enumarable: false, writable: true, configurable: true }
	  descriptor.writable = value
	  return descriptor
	}
}
export default class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			fromData: {
				title: '',
				name: 'lee',
				unit: [],
				startTime: '2018-09-01',
				endTime: '2018-09-07',
				startPos: '',
				endPos: '',
				reason: '我和很多很多我和很多很多我和很多很多我和很多很多我和很多很多我和很多很多我和很多很多我和很多很多我和很多很多我和很多很多我和很多很多'
				
			},
			dict: {
				unit: [
					{
						label: '销售科',
						value: 0,
					},
					{
						label: '宣传科',
						value: 1,
					},
				  ]
			},
			showCalender: false,
			autoFocusInst: null
		}
	}
	handleChange(prop, event) {
		console.log(prop, event)
		this.state.fromData[prop] = event
		this.setState({fromData: this.state.fromData});
	}
	
	componentDidMount() {
	}
	switchCalender (state) {
		this.setState({
			showCalender: state
		}) 
	}
	handleDate (start, end) {
		console.log(start, end)
		const startParse = new Date(start)
		const endParse = new Date(end)
		this.state.fromData.startTime = endParse.format('yyyy-MM-dd')
		this.state.fromData.endTime = startParse.format('yyyy-MM-dd')
		this.setState({fromData: this.state.fromData})
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<div className="index">
                    <NavBar
						icon={<Icon type="left"/>}
					>李大钊发起的报销工单</NavBar>
					<List renderHeader={() => '出差详情'}>
						<InputItem
						    moneyKeyboardAlign="right"
						    disabled
							clear
							value={this.state.fromData.title}
							onChange={(event) => this.handleChange.call(this, 'title', event)}
							placeholder="标题"
						><span style={{'color': '#454545', 'font-size': '16px'}}>标题</span></InputItem>
						<InputItem
						    moneyKeyboardAlign="right"
						    disabled
							clear			
							value={this.state.fromData.name}
							onChange={(event) => this.handleChange.call(this, 'name', event)}
						><span style={{'color': '#454545', 'font-size': '16px'}}>申请人</span></InputItem>
						<InputItem
						    moneyKeyboardAlign="right"
						    disabled
							clear
							value={this.state.fromData.unit}
						><span style={{'color': '#454545', 'font-size': '16px'}}>申请人</span></InputItem>
						<InputItem
						    moneyKeyboardAlign="right"
						    disabled
							clear
							value={`${this.state.fromData.startTime}至${this.state.fromData.endTime}`}
						><span style={{'color': '#454545', 'font-size': '16px'}}>出差时间</span></InputItem>
						<InputItem
						    moneyKeyboardAlign="right"
						    disabled
							clear
							value={this.state.fromData.startPos}
						><span style={{'color': '#454545', 'font-size': '16px'}}>开始地点</span></InputItem>
						<InputItem
						    moneyKeyboardAlign="right"
						    disabled
							clear
							value={this.state.fromData.endPos}
						><span style={{'color': '#454545', 'font-size': '16px'}}>结束地点</span></InputItem>
					</List>
					<List renderHeader={() => '出差事由'} className="my-list">
						<List.Item wrap><span style={{'font-size': '12px'}}>{this.state.fromData.reason}</span></List.Item>
					</List>
					<List renderHeader={() => '审批意见'} className="my-list">
						<TextareaItem
							placeholder='审批意见'
							rows={5}
							count={100}
						/>
					</List>
					<div className="button-wrap">
						<WhiteSpace></WhiteSpace>
						<Button type="primary">同意</Button>
						<WhiteSpace></WhiteSpace>
						<Button type="primary">驳回</Button>
						<WhiteSpace></WhiteSpace>
						<Button type="primary">取消</Button>
					</div>
				</div>
			</div>
		);
	}
}
