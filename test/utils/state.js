const mock20178 = {
	date: new Date('2017-8'),
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
		'2017-8-1': { content: '약속1' }
	},
	dialog: null
};

export const getMockModel = (date) => {
	switch (date) {
	case '2017-8':
		return mock20178;

	default:
		return null;
	}
};
