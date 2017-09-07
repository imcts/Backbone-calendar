import Backbone from 'backbone';

const SIZE_OF_DATES = 42;

export default class Model extends Backbone.Model {
	defaults () {
		return {
			date: new Date(),
			dates: [],
			appointments: {},
			dialog: {}
		};
	}

	initialize () {
		this._buildDates();
	}

	_buildDates () {
		this._setNullBeforeFirstDate();
		this._setDates();
		this._setNullAfterLastDate();
	}

	_setNullBeforeFirstDate () {
		const dates = [];
		const firstDayOfFirstWeek = this._getFirstDayOfFirstWeek();

		for (let i = firstDayOfFirstWeek; i--;) {
			dates.push(null);
		}

		this.set({ dates });
	}

	_getFirstDayOfFirstWeek () {
		const date = this.get('date');
		date.setDate(1);
		return date.getDay();
	}

	_setDates () {
		const date = this.get('date');
		const dates = this.get('dates');
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const lastDateOfMonth = this._getLastDayOfMonth();

		for (let i = 1; i <= lastDateOfMonth; i++) {
			dates.push({
				key: `${year}-${month}-${i}`,
				date: i
			});
		}
	}

	_getLastDayOfMonth () {
		const lastDate = this._getLastDate();
		return lastDate.getDate();
	}

	_getLastDate () {
		const date = this.get('date');
		date.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
		return date;
	}

	_setNullAfterLastDate () {
		const dates = this.get('dates');

		for (let i = dates.length; i < SIZE_OF_DATES; i++) {
			dates.push(null);
		}
	}

	addAppointment (appointment) {
		const appointments = this.get('appointments');
		const { date, content } = appointment;
		appointments[date] = { content };
	}

	removeAppointment (date) {
		const appointments = this.get('appointments');
		delete appointments[date];
	}

	getAppointment (date) {
		const appoitnemtns = this.get('appointments');
		return appoitnemtns[date];
	}

	increaseOneYear () {
		const date = this.get('date');
		date.setFullYear(date.getFullYear() + 1);
	}

	decreaseOneYear () {
		const date = this.get('date');
		date.setFullYear(date.getFullYear() - 1);
	}

	increaseOneMonth () {
		const date = this.get('date');
		date.setMonth(date.getMonth() + 1, 1);
	}

	decreaseOneMonth () {
		const date = this.get('date');
		date.setMonth(date.getMonth() - 1, 1);
	}

	setDialog (dialog) {
		this.set({ dialog });
	}

	getState () {
		return {
			date: this.get('date'),
			dates: this.getDates(),
			appointments: this.getAppointments(),
			dialog: this.get('dialog')
		};
	}

	getAppointments () {
		const originAppointments = this.get('appointments');
		const appointments = {};

		for (let key in originAppointments) {
			appointments[key] = { ...originAppointments[key] };
		}

		return appointments;
	}

	getDialog () {
		return this.get('dialog');
	}

	getDates () {
		return [...this.get('dates')];
	}

	getFullYear () {
		return this.get('date').getFullYear();
	}

	getMonth () {
		return this.get('date').getMonth() + 1;
	}
};
