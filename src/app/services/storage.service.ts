import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Note } from 'android/note';




@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    contesti:string[];

    async setString(key: string, value: string) {
         await Storage.set({ key, value });
    }

    async getString(key: string)  {
        const ret = await Storage.get({ key });
        return JSON.stringify(ret.value);
    
    }

    async setObject(key: string, value:any) {
        await Storage.set({ key, value: JSON.stringify(value) });
    }

    async getObject(key: string){
        const ret = await Storage.get({ key });
        return JSON.parse(ret.value);
    }

    /*async removeItem(key: string) { //per rimuovere una intera sezione 
        await Storage.remove({ key });
    }*/

    async clear() {
        await Storage.clear();
    }
}