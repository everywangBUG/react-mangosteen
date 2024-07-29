
enum StorageType {
  LOCAL = "local",
  SESSION = "session"
}

/**
 * @description: 存储缓存
 * @params: type local | session
 * @return: localStorageCache & sessionStorageCache
 */
class StorageCache {
  storage: Storage
  constructor(type: StorageType) {
    this.storage = type === StorageType.LOCAL ? localStorage : sessionStorage
  }

  setStorage(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getStorage(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeStorage(key: string) {
    this.storage.removeItem(key)
  }

  clearStorage() {
    this.storage.clear()
  }
}

const localStorageCache = new StorageCache(StorageType.LOCAL)
const sessionStorageCache = new StorageCache(StorageType.SESSION)

export { localStorageCache, sessionStorageCache }