/**
 * Schedule datasource spec
 */

export let defaultData: Object[] = [
  {
    Id: 1,
    Subject: 'Conference',
    StartTime: new Date(2021, 6, 14, 10, 0),
    EndTime: new Date(2021, 6, 14, 11, 0),
    RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
    CategoryColor: '#357cd2'
  }, {
    Id: 2,
    Subject: 'Meeting - 1',
    StartTime: new Date(2021, 6, 15, 10, 0),
    EndTime: new Date(2021, 6, 16, 12, 30),
    IsAllDay: false,
    CategoryColor: '#7fa900'
  }, {
    Id: 3,
    Subject: 'Paris',
    StartTime: new Date(2021, 6, 13, 12, 0),
    EndTime: new Date(2021, 6, 13, 12, 30),
    IsAllDay: false,
    IsBlock: true,
  }, {
    Id: 4,
    Subject: 'Vacation',
    StartTime: new Date(2021, 6, 12, 10, 0),
    EndTime: new Date(2021, 6, 12, 10, 30),
    IsAllDay: false,
    CategoryColor: '#ea7a57'
  }
];
