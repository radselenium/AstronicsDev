import React from 'react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, Cell, ResponsiveContainer, Label } from 'recharts';
import axios from 'axios';
import HttpClient from '../config/HttpConfig';
import MessagePerType from './chart-reports/MessagePerType';
import MessagePerDay from './chart-reports/MessagePerDay';

const SimplePieChart = (props) => {
	const pieChartData = [
	//	{ name: 'Incoming ', value: props.messages.incomingMessage },
	//	{ name: 'Recieved ', value: props.messages.recievedMessages != 0?props.messages.recievedMessages:'' },
		// { name: 'Processed ', value: props.messages.processedMessages != 0?props.messages.processedMessages:'' },
		// { name: 'In Queue', value: props.messages.inQueue != 0?props.messages.inQueue:''},
		{ name: 'Picked Up', value: props.messages.processedMessages != 0?props.messages.processedMessages:'' },
		{ name: 'Awaiting Pickup', value: props.messages.inQueue != 0?props.messages.inQueue:''},
		{ name: 'Failed ', value: props.messages.failedProcessing != 0?props.messages.failedProcessing:'' },
		//{ name: 'Resolved ', value: props.messages.resolvedMessages != 0?props.messages.resolvedMessages:''},
	];
	const COLORS = ['#7239ea', '#50cd89', '#ffc700', '#f1416c', '#495d78'];
	//const COLORS = ['#00b2ff', '#7239ea', '#50cd89', '#ffc700', '#f1416c', '#495d78'];
	const RADIAN = Math.PI / 180;	

	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${payload.value}`} {/* Display the actual value instead of the percentage */}
			</text>
		);
	};

	return (

		<ResponsiveContainer height="100%" width="100%">
			<PieChart width={400} height={300}> {/* Increased width to accommodate the legend */}
				<Pie
					data={pieChartData}
					dataKey="value"
					cx="50%"
					cy="50%"
					outerRadius={100}
					fill="#8884d8"
					labelLine={false}
					label={renderCustomizedLabel}
				>
					{pieChartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend align="right" verticalAlign="middle" layout="vertical" />
			</PieChart>
		</ResponsiveContainer>
	);
};

// const barChartData = [
// 	{
// 		Messages: 35,
// 	},
// 	{
// 		Messages: 56,
// 	},
// 	{
// 		Messages: 48,
// 	},
// 	{
// 		Messages: 75,
// 	},
// 	{
// 		Messages: 62,
// 	},
// 	{
// 		Messages: 54,
// 	}
// ];

// const SimpleBarChart1 = () => {
// 	return (
// 		<div className="text-center mx-auto">
// 			<ResponsiveContainer width="100%" height={300}>
// 				<BarChart width={300} height={300} data={barChartData}>
// 					<CartesianGrid strokeDasharray="3 3" />
// 					<XAxis />
// 					<YAxis dataKey="Messages" />
// 					<Tooltip />

// 					<Bar dataKey="Messages" fill="#594d96" />
// 				</BarChart>
// 			</ResponsiveContainer>
// 		</div>
// 	);
// };

// const messageTypeData = [
// 	{
// 		name: "PO_Creation",
// 		messagesCount: 98,

// 	},
// 	{
// 		name: "PO_Ack",
// 		messagesCount: 65,

// 	},
// 	{
// 		name: "Shipment",
// 		messagesCount: 47,

// 	},
// 	{
// 		name: "PO_Change",
// 		messagesCount: 9,

// 	},
// 	{
// 		name: "Invoice_Ack",
// 		messagesCount: 53,

// 	}

// ];

// const SimpleBarChart2 = () => {
// 	return (
// 		<div className="text-center mx-auto">
// 			<ResponsiveContainer width="100%" height={300}>
// 				<BarChart width={300} height={300} data={messageTypeData}>
// 					<CartesianGrid strokeDasharray="3 3" />
// 					<XAxis dataKey="name">

// 					</XAxis>
// 					<YAxis dataKey="messagesCount" />
// 					<Tooltip />

// 					<Bar dataKey="messagesCount" fill="#495d78" />
// 				</BarChart>
// 			</ResponsiveContainer>
// 		</div>
// 	);
// };

const MessagingReport = (props) => {
	
	return (

		<div class="row gx-5 gx-xl-10">
			{/*begin::Col*/}
			<div class={props.showDayChart?("col-xxl-4 col-md-4 col-xl-4 mb-5 mb-xl-10"):("col-xxl-6 col-md-6 col-xl-6 mb-5 mb-xl-10")}>
				{/*begin::Chart widget 27*/}
				<div class="card card-flush h-xl-100 shadow-sm">
					{/*begin::Header*/}
					<div class="card-header py-7 justify-content-center">
						{/*begin::Statistics*/}
						<div class="m-0">
							{/*begin::Heading*/}
							<div class="d-flex align-items-center mb-2">
								{/*begin::Title*/}
								<span class="fs-2qx fw-normal text-gray-800 me-2 lh-1 ls-n2">Message Summary</span>

							</div>

						</div>

					</div>
					{/*end::Header*/}
					{/*begin::Body*/}
					<div class="card-body  pe-10 ps-10 pb-10">
						<div id="kt_charts_widget_28" class="h-300px w-100 min-h-auto mx-auto my-auto"  >
							<SimplePieChart messages={props.messages} />
						</div>
					</div>
					{/*end::Body*/}
				</div>
				{/*end::Chart widget 27*/}
			</div>
			{/*end::Col*/}
			{/*begin::Col*/}
			{props.showDayChart ? <>
			<div class="col-xxl-4 col-md-4 col-xl-4 mb-5 mb-xl-10">
				{/*begin::Chart widget 28*/}
				<div class="card card-flush h-xl-100 shadow-sm">
					{/*begin::Header*/}
					<div class="card-header py-7 justify-content-center">
						{/*begin::Statistics*/}
						<div class="m-0">
							{/*begin::Heading*/}
							<div class="d-flex align-items-center mb-2">
								{/*begin::Title*/}
								<span class="fs-2qx fw-normal text-gray-800 me-2 lh-1 ls-n2">Messages per Day</span>
								

							</div>
							

						</div>
						{/*end::Statistics*/}

					</div>
					{/*end::Header*/}
					{/*begin::Body*/}
					<div class="card-body flex-d-row align-items-center justify-content-center ps-4 pe-4 pb-5 col-md-12 ">
						{/*begin::Chart*/}
						<div id="kt_charts_widget_28" class="h-300px w-100 min-h-auto col-md-12 "  >
							{/* <SimpleBarChart1 /> */}
							<MessagePerDay dataForMessagePerDay={props.messagesPerDay}/>
						</div>
						{/* <div className='col-md-12 row'>
							<span class="fs-2 fw-normal  me-2 lh-1 ls-n2 text-dark">Last 7 Days</span>  
							</div> */}
						{/*end::Chart*/}
					</div>
					{/*end::Body*/}
				</div>
				{/*end::Chart widget 28*/}
			</div>
			</>:<></>}
			{/*end::Col*/}

			{/*begin::Col*/}
			<div class={props.showDayChart?("col-xxl-4 col-md-4 col-xl-4 mb-5 mb-xl-10"):("col-xxl-6 col-md-6 col-xl-6 mb-5 mb-xl-10")}>
				{/*begin::Chart widget 28*/}
				<div class="card card-flush h-xl-100 shadow-sm">
					{/*begin::Header*/}
					<div class="card-header py-7 justify-content-center">
						{/*begin::Statistics*/}
						<div class="m-0">
							{/*begin::Heading*/}
							<div class="d-flex align-items-center mb-2">
								{/*begin::Title*/}
								<span class="fs-2qx fw-normal text-gray-800 me-2 lh-1 ls-n2">Messages per Type</span>

							</div>

						</div>


					</div>

					<div class="card-body d-flex align-items-center justify-content-center ps-4 pe-4 pb-5">
						{/*begin::Chart*/}
						<div id="kt_charts_widget_28" class="h-300px w-100 min-h-auto">
							<MessagePerType dataForMessagePerType={props.messagesPerType}/>
						</div>
						{/*end::Chart*/}
					</div>
					{/*end::Body*/}
				</div>
				{/*end::Chart widget 28*/}
			</div>
			{/*end::Col*/}

		</div>

	)
}



export default MessagingReport