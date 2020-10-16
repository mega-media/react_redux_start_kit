import SchemaValidator from '@mega-media/schema-validator';
import { identity, has } from 'ramda';

const reducerCreator = (initState, actionMaps, schema = null) => {
  let validate = identity;
  if (schema !== null) {
    const validator = new SchemaValidator(initState);
    validator.errorCallback = msg => {
      console.error(msg);
    };
    validator.schema = schema;
    validate = validator.update;
  }

  return (state = validate(initState), { type, payload }) =>
    has(type)(actionMaps) ? validate(actionMaps[type](state, payload)) : state;
};

export default reducerCreator;
