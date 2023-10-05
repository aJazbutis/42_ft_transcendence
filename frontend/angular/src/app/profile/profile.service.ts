import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Match, Stats, User } from '../entities.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    const url = 'http://127.0.0.1:3000/user/profile'
    return this.http.get<User>(url, { withCredentials: true })
  }

  getUser(userID: string): Observable<User> {
    const url = `http://127.0.0.1:3000/user/profile/${userID}`
    return this.http.get<User>(url, { withCredentials: true })
  }

  getCurrentUserFriends(): Observable<User[]> {
    const url = `http://127.0.0.1:3000/user/friends`
    return this.http.get<User[]>(url, { withCredentials: true })
  }

  getFriends(userID: string): Observable<User[]> {
    const url = `http://127.0.0.1:3000/user/${userID}/friends`
    return this.http.get<User[]>(url, { withCredentials: true })
  }

  getRank(userID: string): Observable<number> {
    const url = `http://127.0.0.1:3000/ranking/${userID}`
    return this.http.get<number>(url, { withCredentials: true })
  }

  getCurrentUserStats(): Observable<Stats> {
    const url = `http://127.0.0.1:3000/ranking/stats`
    return this.http.get<Stats>(url, { withCredentials: true })
  }

/*   getMatches(userID: string): Observable<Match[]> {
    const url = `http://127.0.0.1:3000/user/${userID}/matches`
    return this.http.get<Match[]>(url, { withCredentials: true })
  } */

  setAvatar(formData: FormData): Observable<User> {
    const url =`http://127.0.0.1:3000/user/image/upload`
    return this.http.post<User>(url, formData, { withCredentials: true })
  }

  sendRequest(friendID: string): void {
    const url =`http://127.0.0.1:3000/user/friend`
    const request$ = this.http.post<User>(url, friendID, { withCredentials: true }) // Post with ID in the body
    request$.subscribe()
  }

  removeFriend(friendID: string): void {
    const url =`http://127.0.0.1:3000/user/friend/${friendID}`
    const request$ = this.http.delete<User>(url, { withCredentials: true })
    request$.subscribe()
  }
}
