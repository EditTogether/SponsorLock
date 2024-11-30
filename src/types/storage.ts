export interface StorageChangesObject {
    [key: string]: {
        oldValue?: unknown;
        newValue?: unknown;
    };
}

export interface StorageObjects<Config, Storage> {
    sync: Config;
    local: Storage;
}
