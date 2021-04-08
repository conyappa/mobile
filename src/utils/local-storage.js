import AsyncStorage from '@react-native-async-storage/async-storage';
import { fromPairs, map } from 'lodash';

export async function storeData(values) {
  try {
    await Promise.all(
      map(
        values,
        (value, key) => AsyncStorage.setItem(key, value),
      ),
    );
    return true;
  } catch (error) {
    return false;
  }
}

export async function getData(keys) {
  try {
    const result = await Promise.all(
      map(
        keys,
        async (key) => {
          const storedValue = await AsyncStorage.getItem(key);
          return [key, storedValue];
        },
      ),
    );
    return fromPairs(result);
  } catch (error) {
    return {};
  }
}

export async function removeData(keys) {
  try {
    await Promise.all(
      map(
        keys,
        (key) => AsyncStorage.removeItem(key),
      ),
    );
    return true;
  } catch (error) {
    return true;
  }
}
