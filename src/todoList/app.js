/**
 * @project: 主业务逻辑页面
 * @author: lee
 * @date: 2018-10-08
 */
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

import React, { Component } from "react";
import { NavBar, Icon, Calendar, WhiteSpace, Button } from 'antd-mobile';
import { Select } from 'antd';
import axios from 'axios'
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); 
	return null; 
}
let token = null
export default class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			show: false,
			startDate: '',
			endDate: '',
			startDate_select: '',
			endDate_select: ''
		}
	}
	componentDidMount() {
		const openid = getQueryString('openid')
		axios.post('http://221.176.65.6:80/userapi/management/ssoRest/wxLogin', {
			openid
		}).then(res => {
			token = res.data.token
		})
	}
	setShow (state) {
		this.setState({
			show: state
		})
	}
	onRangeSelect (end, start) {
		this.setState({
			startDate_select: start,
			endDate_select: end
		})
	}
	confirm () {
		this.setState({
			startDate: this.state.startDate_select,
			endDate: this.state.endDate_select,
			show: false
		})
	}
	DateRange () {
		let startDate = this.state.startDate
		let endDate = this.state.endDate
		startDate = new Date(startDate)
		endDate = new Date(endDate)
		return (this.state.startDate ? `${startDate.format('yyyy-MM-dd')}至${endDate.format('yyyy-MM-dd')}` : '请选择时间段')
	}
	search () {
		axios.get('http://221.176.65.6:80/demandapi/demand/TravelApplyRest/restcloud/rest/demand/TravelApplyRest/findTraveApplyList', {
			params: {
				pageNo: 1,
				pageSize: 10,
				startDate: this.startDate,
				endDate: this.endDate,
				token
			}
		})
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
						<div className="changeDate">出差时间段 <span onClick={this.setShow.bind(this, true)}>{this.DateRange.call(this)}</span> </div>
						<WhiteSpace></WhiteSpace>
						<Button onClick={this.search.bind(this)} size="small" type="primary">查询</Button>
						<WhiteSpace></WhiteSpace>
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
				<Calendar
					 visible={this.state.show}
					 onSelect = {this.onRangeSelect.bind(this)}
					 onConfirm = {this.confirm.bind(this)}
					 onCancel = {this.setShow.bind(this, false)}
				></Calendar>
			</div>
		);
	}
}
