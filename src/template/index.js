import _ from 'underscore'

const template = (`
	<div class="container">
		<div class="header">
			<div class="year">
				<button class="_year-prev"></button>
				<div class="_year"></div>
				<button class="_year-next"></button>
			</div>
	
			<div class="month">
				<button class="_month-prev"></button>
				<div class="_month"></div>
				<button class="_month-next"></button>
			</div>
		</div>
	
		<div class="_dates">
			<% for (let i = 42; i--;) {%>
			<div class="date _date"></div>
			<% }%>
		</div>
	
		<div class="_dialog"></div>
	</div>
`)

export default _.template(template)
