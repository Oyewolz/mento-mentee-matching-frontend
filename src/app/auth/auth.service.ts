import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { RestService } from '../shared/http/rest.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private restService: RestService,private auth: Auth) {

  }

  login(username: string, password: string): Observable<UserCredential> {
    const res = () => signInWithEmailAndPassword(this.auth, username, password);
    // build up a cold observable
    return defer(res);
  }

  Signup(email: string, password: string, custom: any): Observable<UserCredential> {
    const res = () => createUserWithEmailAndPassword(this.auth, email, password);
    // it also accepts an extra attributes, we will handle later
    return defer(res)
  }
  LoginGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider(); // from @angular/fire/auth
    const res = () => signInWithPopup(this.auth, provider);
    return defer(res);
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.auth.onAuthStateChanged((user) => {
        subscriber.next(!!user);
      });
    });
  }
  async logout() {
    return this.auth.signOut();
  }
}
