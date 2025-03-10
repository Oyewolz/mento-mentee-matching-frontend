import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { RestService } from '../shared/http/rest.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { environment } from '../../environments/environment.development';

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

  signUp(email: string, password: string, custom: any): Observable<UserCredential> {
    const res = () => createUserWithEmailAndPassword(this.auth, email, password);
    return defer(res);
  }
  loginGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider(); // from @angular/fire/auth
    const res = () => signInWithPopup(this.auth, provider);
    return defer(res);
  }

  retrieveUserProfile(email: string): Observable<any> {
    return this.restService.get(environment.baseUrl+`/user/details/${email}`);
  }

  getUserEmail(): Observable<string | null> {
    return new Observable((subscriber) => {
      this.auth.onAuthStateChanged((user) => {
        subscriber.next(user ? user.email : null);
      });
    });
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.auth.onAuthStateChanged((user) => {
        subscriber.next(!!user);
      });
    });
  }
   logout() {
    // we will handle this later
    const res = () => this.auth.signOut();
    return defer (res) ;
  }
}
