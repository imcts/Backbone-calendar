import expect from 'expect';
import Model from '../../src/model/Model';

describe('Model', () => {
	it('Model/getYear/getMonth(): 지정한 날짜로 모델이 생성되어야 합니다.', () => {
		// Given
		const date = new Date('2017-8-1');
		const model = new Model({ date });

		// When
		const year = model.getFullYear();
		const month = model.getMonth();

		// Then
		expect(year).toEqual(2017);
		expect(month).toEqual(8);
	});

	it('Model/getYear/getMonth(): 날짜를 지정하지 않으면 오늘 날짜로 모델이 생성되어야 합니다.', () => {
		// Given
		const today = new Date();
		const model = new Model({ today });

		// When
		const year = model.getFullYear();
		const month = model.getMonth();

		// Then
		expect(year).toEqual(today.getFullYear());
		expect(month).toEqual(today.getMonth() + 1);
	});

	it('Model(): 지정한 달의 날짜 목록이 리턴 되어야 합니다.', () => {
		// Given
		const date = new Date('2017-8-24');
		const model = new Model({ date });

		// When
		const dates = model.getDates();

		// Then
		const thirtyOneOfJuly = dates[1];
		expect(thirtyOneOfJuly).toNotExist();

		const firstOfAugust = dates[2];
		expect(firstOfAugust.date).toEqual(1);

		const firstOfSeptember = dates[33];
		expect(firstOfSeptember).toNotExist();
	});

	it('addAppointment/getAppointment(): 지정한 날짜에 약속을 추가할 수 있어야 합니다.', () => {
		// Given
		const date = '2017-8-24';
		const content = '약속';
		const model = new Model();

		// When
		model.addAppointment({ date, content });

		// Then
		const appointment = model.getAppointment(date);
		expect(appointment.content).toEqual(content);
	});

	it('addAppointment/getAppointment(): 지정한 날짜에 약속이 있는경우 기존 약속을 덮어써야 합니다.', () => {
		// Given
		const date = '2017-8-24';
		const content1 = '약속1';
		const content2 = '약속2';

		const model = new Model();

		model.addAppointment({
			date: date,
			content: content1
		});

		// When
		model.addAppointment({
			date: date,
			content: content2
		});

		// Then
		const appointment = model.getAppointment(date);
		expect(appointment.content).toEqual(content2);
	});

	it('removeAppointment(): 지정한 날짜에 약속이 있을때 해당 약속을 삭제할 수 있어야 합니다.', () => {
		// Given
		const date = '2017-8-24';
		const content = '약속';
		const model = new Model();

		model.addAppointment({ date, content });

		// When
		model.removeAppointment(date);

		// Then
		const appointment = model.getAppointment(date);
		expect(appointment).toNotExist();
	});

	it('increaseOneYear(): 지정한 날짜로부터 1년 증가해야 합니다.', () => {
		// Given
		const date = new Date('2017-8-25');
		const model = new Model({ date });

		// When
		model.increaseOneYear();

		// Then
		const year = model.getFullYear();
		expect(year).toEqual(2018);
	});

	it('decreaseOneYear(): 지정한 날짜로부터 1년 감소해야 합니다.', () => {
		// Given
		const date = new Date('2017-8-25');
		const model = new Model({ date });

		// When
		model.decreaseOneYear();

		// Thenㅋ
		const year = model.getFullYear();
		expect(year).toEqual(2016);
	});

	it('increaseOneMonth(): 지정한 날짜로부터 1달 증가해야 합니다.', () => {
		// Given
		const date = new Date('2017-8-25');
		const model = new Model({ date });

		// When
		model.increaseOneMonth();

		// Then
		const month = model.getMonth();
		expect(month).toEqual(9);
	});

	it('decreaseOneMonth(): 지정한 날짜로부터 1달 감소해야 합니다.', () => {
		// Given
		const date = new Date('2017-8-25');
		const model = new Model({ date });

		// When
		model.decreaseOneMonth();

		// Then
		const month = model.getMonth();
		expect(month).toEqual(7);
	});

	it('setDialog/getDialog(): 다이얼로그의 상태를 등록할 수 있어야 합니다.', () => {
		// Given
		const dialog = { appoitnemtn: '약속 내용' };
		const model = new Model();

		// When
		model.setDialog(dialog);

		// Then
		const expectedDialog = model.getDialog();
		expect(expectedDialog).toEqual(dialog);
	})

	it('getState(): 모델의 상태를 반환할 수 있어야 합니다.', () => {
		// Given
		const date = new Date('2017-8-1');
		const model = new Model({ date });

		model.addAppointment({ date: '2017-8-1', content: '약속 내용1' });
		model.addAppointment({ date: '2017-8-2', content: '약속 내용2' });
		model.setDialog({ appointment: '약속 내용' });

		// When
		const state = model.getState();

		// Then
		const expectedState = {
			date: date,
			dates: [
				null, null,
				{ key: '2017-8-1', date: 1 },
				{ key: '2017-8-2', date: 2 },
				{ key: '2017-8-3', date: 3 },
				{ key: '2017-8-4', date: 4 },
				{ key: '2017-8-5', date: 5 },
				{ key: '2017-8-6', date: 6 },
				{ key: '2017-8-7', date: 7 },
				{ key: '2017-8-8', date: 8 },
				{ key: '2017-8-9', date: 9 },
				{ key: '2017-8-10', date: 10 },
				{ key: '2017-8-11', date: 11 },
				{ key: '2017-8-12', date: 12 },
				{ key: '2017-8-13', date: 13 },
				{ key: '2017-8-14', date: 14 },
				{ key: '2017-8-15', date: 15 },
				{ key: '2017-8-16', date: 16 },
				{ key: '2017-8-17', date: 17 },
				{ key: '2017-8-18', date: 18 },
				{ key: '2017-8-19', date: 19 },
				{ key: '2017-8-20', date: 20 },
				{ key: '2017-8-21', date: 21 },
				{ key: '2017-8-22', date: 22 },
				{ key: '2017-8-23', date: 23 },
				{ key: '2017-8-24', date: 24 },
				{ key: '2017-8-25', date: 25 },
				{ key: '2017-8-26', date: 26 },
				{ key: '2017-8-27', date: 27 },
				{ key: '2017-8-28', date: 28 },
				{ key: '2017-8-29', date: 29 },
				{ key: '2017-8-30', date: 30 },
				{ key: '2017-8-31', date: 31 },
				null, null, null, null, null,
				null, null, null, null
			],
			appointments: {
				'2017-8-1': { content: '약속 내용1' },
				'2017-8-2': { content: '약속 내용2' }
			},
			dialog: {
				appointment: '약속 내용'
			}
		};
		expect(state).toEqual(expectedState);
	});
});
