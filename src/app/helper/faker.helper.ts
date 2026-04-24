import { faker } from '@faker-js/faker';
import moment from 'moment';

export const platform = ['facebook', 'instagram', 'twitter'];
export const statusUser = ['active', 'inactive'];
const unit = ['minute', 'hour', 'day', 'week'];
const level = ['Eazy', 'Moderate', 'Hard', 'Extreme', 'Insane'];
const taskType = [
  'Development',
  'Research',
  'Bugs',
  'Maintenance',
  'Desain',
  'Slicing',
];

export const generateDummyData = (type: string, numberOfData: number = 5) => {
  const name = faker.name.findName();

  return Array.from(Array(numberOfData).keys()).map(() => {
    switch (type) {
      case 'taskType':
        return {
          id: faker.datatype.uuid(),
          name: taskType[Math.floor(Math.random() * taskType.length)],
          createdAt: moment(faker.datatype.datetime()).toISOString(),
          updatedAt: moment(faker.datatype.datetime()).toISOString(),
        };
      case 'division':
      case 'role':
        return {
          id: faker.datatype.uuid(),
          name: faker.lorem.words(2),
          description: faker.lorem.sentences(1),
          createdAt: moment(faker.datatype.datetime()).toISOString(),
          updatedAt: moment(faker.datatype.datetime()).toISOString(),
        };
      case 'workspace':
        return {
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
          description: faker.lorem.sentences(1),
          pic: faker.internet.avatar(),
          image: faker.internet.avatar(),
          teams: [0, 1, 2, 3, 4, 5, 6].map(() => ({ fullname: faker.name.findName(), avatar: faker.internet.avatar() })),
          createdAt: moment(faker.datatype.datetime()).toISOString(),
          updatedAt: moment(faker.datatype.datetime()).toISOString(),
        };
      case 'priority':
        return {
          id: faker.datatype.uuid(),
          name: faker.lorem.words(2),
          level: faker.datatype.number(2),
          createdAt: moment(faker.datatype.datetime()).toISOString(),
          updatedAt: moment(faker.datatype.datetime()).toISOString(),
        };
      case 'difficultyLevel':
        return {
          id: faker.datatype.uuid(),
          name: level[Math.floor(Math.random() * level.length)],
          level: faker.datatype.number(1),
          maxTime: faker.datatype.number(1),
          unit: unit[Math.floor(Math.random() * unit.length)],
          createdAt: moment(faker.datatype.datetime()).toISOString(),
          updatedAt: moment(faker.datatype.datetime()).toISOString(),
        };
      case 'user':
        return {
          id: faker.datatype.uuid(),
          divisionId: faker.datatype.uuid(),
          roleId: faker.datatype.uuid(),
          username: faker.internet.userName(name),
          password: 'secret',
          fullname: faker.name.findName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          telegram: '@' + faker.internet.userName(),
          about: '',
          division: level[Math.floor(Math.random() * level.length)],
          avatar: faker.internet.avatar(),
          status: statusUser[Math.floor(Math.random() * statusUser.length)],
          createdAt: moment(faker.datatype.datetime()).toISOString(),
          updatedAt: moment(faker.datatype.datetime()).toISOString(),
        };
      case 'kinerja_availability':
        return {
          number: faker.datatype.number(),
          point_kinerja: faker.datatype.number(),
          jumlah_point: faker.datatype.number(),
          bulan_ini: faker.datatype.number(),
          hari_kemarin: faker.datatype.number(),
        }
        case 'penyulang_trip':
        return {
          number: faker.datatype.number(),
          hari_ini: faker.datatype.number(),
          kemarin: faker.datatype.number(),
          bulan_ini: faker.datatype.number(),
        }
      case 'kinerja_remote':
        return {
          number: faker.datatype.number(),
          jumlah_sukses: faker.datatype.number(),
          nama_kinerja: faker.internet.userName(),
          jumlah_gagal: faker.datatype.number(),
          kinerja: faker.datatype.float(2),
        }
      case 'pertanyaan_qrc':
        return {
          id: faker.datatype.uuid(),
          pertanyaan: faker.lorem.sentences(1),
          point: faker.datatype.number(10)
        };
      case 'approval':
        return {
          id: faker.datatype.uuid(),
          nama_pegawai: faker.name.findName(),
          jabatan: faker.lorem.words(2)
        };
        case 'faker':
        return {
          id: faker.datatype.uuid(),
          uuid: faker.datatype.uuid(),
          findName: faker.name.findName(),
          sentences: faker.lorem.sentences(1),
          boolean: faker.datatype.boolean(),
          number: faker.datatype.number(999),
          longNumber: faker.datatype.number(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.phoneNumber(),
          username: faker.internet.userName(name),
          avatar: faker.internet.avatar(),
          datetime: moment(faker.datatype.datetime()).toISOString(),
          ip: faker.internet.ip(),
          alpha: faker.random.alpha().toUpperCase(),
        };
      default:
        break;
    }
  });
};
