/**
 * @project: 主业务逻辑页面
 * @author: lee
 * @date: 2018-10-08
 */

import React, { Component } from "react";
import { List, InputItem, WhiteSpace, Button, TextareaItem } from 'antd-mobile';
import { Select } from 'antd';
import axios from 'axios'
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
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); 
	return null; 
}
let token = null
let applyID = null
const EnumState = new Map()
EnumState.set('0', '科室经理审批意见')
EnumState.set('1', '中心领导审批意见')
EnumState.set('2', '审批通过')

export default class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			visible: true,
			showViewer: false,
			fromData: {
				title: '',
				name: '',
				ouName: [],
				startDate: '',
				endDate: '',
				startPos: '',
				endPos: '',
				reason: '',
				approvalRemark: '',
				formStatus: 0,
				travelApplyTasks: []
				
			},
			dict: {
				ouName: [
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
		applyID = getQueryString('applyID')
		const openid = getQueryString('openid')
		axios.post('http://221.176.65.6:80/userapi/management/ssoRest/wxLogin', {
			openid
		}).then(res => {
			token = res.data.token
			axios.get('http://221.176.65.6:80/demandapi/demand/TravelApplyRest/getTravelApplyByID', {params: {applyID, token}}).then(({data}) => {
				console.log(data)
				this.state.fromData.title = data.title
				this.state.fromData.name = data.userName
				this.state.fromData.ouName = data.ouName
				this.state.fromData.startDate = data.startDate
				this.state.fromData.endDate = data.endDate
				this.state.fromData.startPos = data.startPlace
				this.state.fromData.reason = data.travelReason
				this.state.fromData.reason = data.travelReason
				this.state.fromData.formStatus = data.formStatus
				this.state.fromData.travelApplyTasks = data.travelApplyTasks
				this.state.fromData.fileName = data.fileName
				this.state.fromData.fileId = data.fileId
				this.setState({
					fromData: this.state.fromData
				})
			})
		})
	}
	// 0-不同意 1-同意
	judge (state) {
		axios.post('http://221.176.65.6:80/demandapi/demand/TravelApplyRest/updateTravelApply', {
			applyId: applyID,
			state,
			approvalRemark: this.state.fromData.approvalRemark,
			formStatus: Number(this.state.fromData.formStatus) + 1,
			token

		}).then(res => {
			window.history.back()
		}).catch(() => {
			alert("错误")
		})
	}
	switchCalender (state) {
		this.setState({
			showCalender: state
		}) 
	}
	handleDate (start, end) {
		const startParse = new Date(start)
		const endParse = new Date(end)
		this.state.fromData.startDate = endParse.format('yyyy-MM-dd')
		this.state.fromData.endDate = startParse.format('yyyy-MM-dd')
		this.setState({fromData: this.state.fromData})
	}
    show() {
		if (!this.isImg()) return
        this.setState({ visible: true })
    }
    close () {
        this.setState({ visible: false})
	}
	isImg () {
		return [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/].find(reg => {
			const res = reg.test(this.state.fromData.fileName)	
			return res
		})

	}
	render() {
		const isImg = this.isImg()
		const baseUrl = 'http://221.176.65.6:808/pm/fileapi/fileManagement/fileUpload/download?fileId='
		return (
			<div className="index">
				<List renderHeader={() => '出差详情'}>
					<InputItem
						moneyKeyboardAlign="right"
						disabled
						clear
						value={this.state.fromData.title}
						onChange={(event) => this.handleChange.call(this, 'title', event)}
						placeholder="标题"
					><span style={{'color': '#454545', 'fontSize': '16px'}}>标题</span></InputItem>
					<InputItem
						moneyKeyboardAlign="right"
						disabled
						clear			
						value={this.state.fromData.name}
						onChange={(event) => this.handleChange.call(this, 'name', event)}
					><span style={{'color': '#454545', 'fontSize': '16px'}}>申请人</span></InputItem>
					<InputItem
						moneyKeyboardAlign="right"
						disabled
						clear
						value={this.state.fromData.ouName}
					><span style={{'color': '#454545', 'fontSize': '16px'}}>申请人</span></InputItem>
					<InputItem
						moneyKeyboardAlign="right"
						disabled
						clear
						value={`${this.state.fromData.startDate}至${this.state.fromData.endDate}`}
					><span style={{'color': '#454545', 'fontSize': '16px'}}>出差时间</span></InputItem>
					<InputItem
						moneyKeyboardAlign="right"
						disabled
						clear
						value={this.state.fromData.startPos}
					><span style={{'color': '#454545', 'fontSize': '16px'}}>出差地点</span></InputItem>
				</List>
				<List renderHeader={() => '出差事由'} className="my-list">
					<List.Item wrap><span style={{'fontSize': '12px'}}>{this.state.fromData.reason}</span></List.Item>
				</List>
				<List renderHeader={() => '附件'} className="my-list">
					<div className="fileName" onClick={this.show.bind(this)}><a>{this.state.fromData.fileName}</a>
						{isImg && <span className="right-side">下载</span>}
					</div>
				</List>
				{this.state.fromData.travelApplyTasks ? this.state.fromData.travelApplyTasks.map((item, index) => {
					return (
						<List renderHeader={() => EnumState.get(item.currentStep)} className="my-list">
							<List.Item wrap><span style={{'fontSize': '12px'}}>{item.approvalRemark}</span></List.Item>
						</List>
					)
				}) : ''}
				{
					Number(this.state.fromData.formStatus) < 2 ?
					<div>
						<List renderHeader={() => '审批意见'} className="my-list">
							<TextareaItem
								disabled={Number(this.state.fromData.formStatus) > 2}
								value={this.state.fromData.approvalRemark}
								onChange={event => this.handleChange.call(this, 'approvalRemark', event)}
								placeholder='审批意见'
								rows={5}
								count={100}
							/>
						</List>
						<div className="button-wrap">
							<WhiteSpace></WhiteSpace>
							<Button type="primary" onClick={() => this.judge.call(this, 1)}>同意</Button>
							<WhiteSpace></WhiteSpace>
							<Button type="primary" onClick={() => this.judge.call(this, 0)}>驳回</Button>
						</div>
					</div>
					: ''
				}
				<WhiteSpace></WhiteSpace>
				{this.state.visible && this.state.fromData.fileId && <div id="imgPreview" onClick={this.close.bind(this)}><div className="cell"><img src={require(`${baseUrl}${this.state.fromData.fileId}`)}></img></div></div>}
			</div>
		);
	}
}
