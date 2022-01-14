import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  constructor() { }

  private key = 'user';

  checkIsValid() {
    return !!localStorage.getItem(this.key);
  }

  setAuthIdentity(identity: string) {
    localStorage.setItem(this.key, identity);
  }

  removeAuthIdentity() {
    localStorage.removeItem(this.key)
  }
}
