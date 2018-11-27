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
import { Calendar, WhiteSpace, PullToRefresh, Flex } from 'antd-mobile';
import { Select } from 'antd';
import axios from 'axios'
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); 
	return null; 
}
let token = null
const EnumState = new Map()
EnumState.set('0', '科室经理审批中')
EnumState.set('1', '中心领导审批中')
EnumState.set('2', '审批通过')
let CurrentPage = 0
const StateOption = []

export default class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			show: false,
			startDate: '',
			endDate: '',
			startDate_select: '',
			endDate_select: '',
			list: [],
			juedgeState: 0
		}
	}
	componentDidMount() {
		const openid = getQueryString('openid')
		axios.post('http://221.176.65.6:80/userapi/management/ssoRest/wxLogin', {
			openid
		}).then(res => {
			token = res.data.token
			this.search()
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
	stateChange (event) {
		this.setState({
			juedgeState: event
		}, this.search)
	}
	search (isFresh) {
		const apiOption = new Map() 
		apiOption.set(0, 'http://221.176.65.6:80/demandapi/demand/TravelApplyRest/findDaiBanList')
		apiOption.set(1, 'http://221.176.65.6:80/demandapi/demand/TravelApplyRest/findYiBanList')
		axios.get(apiOption.get(this.state.juedgeState), {
			params: {
				pageNo: CurrentPage = isFresh ? CurrentPage : 1 ,
				pageSize: 10,
				token
			}
		}).then(({data}) => {
			CurrentPage += 1
			if (isFresh) {
				data.rows = this.state.list.concat(data.rows)
			}
			this.setState({
				list: data.rows
			})
		})
	}
	toDetail (applyID) {
		// console.log(`/todoDetail?openid=${getQueryString('openid')}&&applyID=${applyID}` )
		window.location.href = `todoDetail.html?openid=${getQueryString('openid')}&&applyID=${applyID}` 
	}
	refresh () {
		this.search(true)
	}
	render() {
		return (
			<div className="global">
				<Flex direction="column" align="stretch">
					<div className="title-wrap">
						<div className="title">出差申请</div>
						<div className="panel">
							<div value={this.state.juedgeState} style={{color: (this.state.juedgeState === 0 ? '#108ee9' : '#454545')}} onClick={() => this.stateChange.call(this, 0)}>审批列表</div>
							<div value={1} style={{color: (this.state.juedgeState === 1 ? '#108ee9' : '#454545')}} onClick={() => this.stateChange.call(this, 1)}>已审列表</div>
						</div>
					</div>
					<WhiteSpace></WhiteSpace>
					<Flex.Item flex="100%">
						<div className="card-wrap">
							<PullToRefresh onRefresh={this.refresh.bind(this)} direction="up"
								style={{
									height: '100%',
									overflow: 'auto',
								}}
							>
								{this.state.list.map((item, index) => {
									return (
										<div className="card" onClick={() => this.toDetail.call(this, item.applyId)}>
										<p className="title">{item.title}</p>
										<div className="content">
										<div className="content-item">申请时间: {item.createTime}</div>
										<div className="content-item">申请状态: <span className="state">{EnumState.get(item.formStatus)}</span></div>
										</div>
									</div>
									)
								})}
							</PullToRefresh>
						</div>
					</Flex.Item>
				</Flex>
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
