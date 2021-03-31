import { getStorage } from '../utils/storage';

let chatRecord = null;
const current = getStorage('chatRecord');
if (current) {
  chatRecord = JSON.parse(current);
}
export default {
  chatRecord,
};
