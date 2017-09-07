import expect, { spyOn } from 'expect';
import View from '../../src/view/View';
import { getMockModel } from '../../test/utils/state'

describe('View', () => {
	it('View(): 날짜 엘리먼트를 생성하여야 합니다.', () => {
		// Given
		const el = '#app';

		// When
		const view = new View({ el });

		// Then
		expect(view.$('.date').length).toEqual(42);
	});

	it('update(): 지정한 모델의 상태값에 따라 화면을 갱신 합니다.', () => {
		// Given
		const view = new View({
			el: '#app',
			model: getMockModel('2017-8')
		});

		// When
		view.update()

		// Then
		expect(view.$el.text().replace(/\s/g, '')).toMatch(/201781(\d+)31/, '년월일이 출력되어야 합니다.');
		expect(view.$('._dates ._date:nth-child(1)').text()).toBe('') // 7월 31일의 text는 비어있어야 합니다.
		expect(view.$('._dates ._date:nth-child(33)').text()).toBe('') // 9월 1일의 text는 비어있어야 합니다.
	})

	it('update(): 한달에 5개주만 사용하는 경우 마지막 한 주는 숨겨져야 합니다.', () => {
		// Give
		const view = new View({
			el: '#app',
			model: getMockModel('2017-8')
		});

		// When
		view.update()

		// Then
		expect(view.$('._dates ._date:nth-child(34)').css('display')).toEqual('block') // 9월 2일의 date는 보여져야 합니다.
		expect(view.$('._dates ._date:nth-child(35)').css('display')).toEqual('none') // 9월 3일의 date는 숨겨져야 합니다.
	})

	it('날짜를 클릭했을때 이벤트 핸들러가 실행되어야 합니다.', () => {
		// Given
		const view = new View({
			el: '#app',
			model: getMockModel('2017-8')
		})
		const spy = spyOn(view, '_updateAppointmentInDialog')

		view.delegateEvents()

		// When
		view.$('._dates ._date:nth-child(2)').click()

		// Then
		expect(spy).toHaveBeenCalled()
	})
})
