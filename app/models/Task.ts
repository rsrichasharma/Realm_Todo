import Realm, {BSON} from 'realm';
import {createRealmContext} from '@realm/react';

export class Task extends Realm.Object<Task> {
  _id!: BSON.ObjectId;
  description!: string;
  completed!: boolean;
  createdAt: Date = new Date();
  user!: string;

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      completed: {type: 'bool', default: false},
      createdAt: 'date',
      user: 'string',
    },
  };
}
export const RealmContext = createRealmContext({
  schema: [Task],
});
