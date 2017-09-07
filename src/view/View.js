import Backbone from 'backbone';
import _ from 'underscore';
import template from '../template'

const NUMBER_OF_DAYS_OF_WEEK = 7

export default class View extends Backbone.View {
	constructor (options) {
		super({
			events: {
				'click ._year-prev': '_decreaseOneYear',
				'click ._year-next': '_increaseOneYear',
				'click ._month-prev': '_decreaseOneMonth',
				'click ._month-next': '_increaseOneMonth',
				'click ._date': '_updateAppointmentInDialog'
			},

			model: _.extend({}, options.model, {
				on: _.noop,
				get: function (key) { return this[key] },
				toJSON: function () { return this }
			}),

			template
		})
	}

	initialize () {
		this.model.on('change', this.update, this)
		this.render()
	}

	render () {
		this.$el.html(this.template(this.model.toJSON()));
		return this
	}

	_increaseOneYear () {
		this.model.increaseOneYear()
	}

	_decreaseOneYear () {
		this.model.decreaseOneMonth()
	}

	_increaseOneMonth () {
		this.model.increaseOneMonth()
	}

	_decreaseOneMonth () {
		this.model.decreaseOneMonth()
	}

	_updateAppointmentInDialog (e) {
		const $date = $(e.target)
		const appointments = this.model.get('appointments')
		const key = $date.data('key')

		this.model.setDialog(appointments[key])
	}

	update () {
		this._setHeader()
		this._setDates()
		this._setDialog()
	}

	_setHeader () {
		const date = this.model.get('date')
		this.$('._year').text(date.getFullYear())
		this.$('._month').text(date.getMonth() + 1)
	}

	_setDates () {
		const dates = this.model.get('dates')

		dates.forEach((date, index) => {
			const $date = this.$(`._dates ._date:nth-child(${index})`)

			if (date) {
				this._drawDate($date, date)
				return
			}

			if (this._isFirstWeekOrLastSundayHasNull(index)) {
				this._drawBlankDate($date)
				return
			}

			this._drawEmptyDate($date)
		})
	}

	_drawDate ($date, date) {
		$date.text(date.date).data('key', date.key)
	}

	_isFirstWeekOrLastSundayHasNull (index) {
		return this._isFirstWeek(index) || this._isSundayHasNotNull(index)
	}

	_isFirstWeek (index) {
		return index < NUMBER_OF_DAYS_OF_WEEK;
	}

	_isSundayHasNotNull (index) {
		const lastSunday = this._getLastSunday(index)
		return lastSunday !== null
	}

	_getLastSunday (index) {
		const dates = this.model.get('dates')
		return dates[index - (index % 7)]
	}

	_drawBlankDate ($date) {
		$date.text('').show()
	}

	_drawEmptyDate ($date) {
		$date.text('').hide()
	}

	_setDialog () {
		const dialog = this.model.get('dialog')
		this.$('._dialog').html(dialog)[Boolean(dialog) === true ? 'show' : 'hide']()
	}
}
