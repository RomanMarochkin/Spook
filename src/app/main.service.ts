import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  settings = {
    error: null
  }
  usersInfo = {
    usersList: null,
    startUsersList: null
  }
  userInfo = {
    currentUser: null,
    userById: null,
    comments: [],
    feed: null,
    followersAndFollowing: null 
  }
  getSettings() {return this.settings}
  getUsersInfo(){return this.usersInfo}
  setUsersList(users){
    this.usersInfo.usersList = users
    this.usersInfo.startUsersList = users
  }
  updateUsersList(users){this.usersInfo.usersList = users}
  getUserInfo(){return this.userInfo}
  setCurrentUser(user){this.userInfo.currentUser = user}
  setError(error){this.settings.error = error}
  setUserByIdInfo(user){this.userInfo.userById = user}
  updatePosts(post){this.userInfo.userById.posts.push(post)}
  setComments(comments){this.userInfo.comments = comments}
  updateComments(comment){this.userInfo.comments.push(comment)}
  setFeed(feed){this.userInfo.feed = feed.reverse()}
  setFollowersAndFollowing(data){this.userInfo.followersAndFollowing = data}
  getFollowersOrFollowing(type){
    if(type === 'followers'){
      return this.userInfo.followersAndFollowing.followers
    }
    if(type === 'followings'){
      return this.userInfo.followersAndFollowing.following
    }
  }
  updateCommentsDelete(id){
    const comentIndex = this.userInfo.comments.findIndex((elem) => elem.id === id)
    this.userInfo.comments.splice(comentIndex, 1)
  }
  updateCommentsUpdate(id, text){
    const coment = this.userInfo.comments.find((elem) => elem.id === id)
    coment.text = text
  }
  clearComments(){
    this.userInfo.comments.length = 0
  }
  updateUserIsFollow(id){
    const user = this.usersInfo.usersList.find((elem) =>{
      return elem._id === id
    })
    user.isFollow = !user.isFollow
  }
  timeout = null
  constructor(private http: HttpClient, public router: Router) {}
  handleError(error: HttpErrorResponse) {
    this.setError(error.error)
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setError(null)
    }, 3000);
    return throwError(error.error);
  }
  hiddenError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
  baseUrl = 'https://hipstagram-api.herokuapp.com';
  isAuth = false
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token
  }
  setIsAuth(isAuth: boolean){
    this.isAuth = isAuth
    if(isAuth){
      this.router.navigate(['users']);
    }else{
      localStorage.removeItem('token')
      this.router.navigate(['login']);
    }
  }
  init(){
    const token = localStorage.getItem('token')
    if(token){
       this.isAuth = true
    }
    if(!token){
      this.isAuth = false
   }
  }
  registration(data){
    return this.http.post(this.baseUrl + '/auth/registration', data)
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }
  login(data){
    return this.http.post(this.baseUrl + '/auth/login', data)
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.baseUrl + '/users/current', {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  getUsers(login): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.baseUrl + `/users?search=${login}`, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  followUser(id): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.baseUrl + `/users/follow/${id}`, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  getUserById(id): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.baseUrl + `/users/${id}`, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  createPost(data){
    const token = localStorage.getItem('token')
    return this.http.post(this.baseUrl + '/posts', data, {headers: {Authorization: token}})
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }
  getPostById(id): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.baseUrl + `/posts/${id}`, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  getComments(id): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.baseUrl + `/comments/${id}`, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  createComment(data) {
    const token = localStorage.getItem('token')
    return this.http.post(this.baseUrl + `/comments`, data, {headers: {Authorization: token}})
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }
  deleteComment(id) {
    const token = localStorage.getItem('token')
    return this.http.delete(this.baseUrl + `/comments/${id}`, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  updateComment(id, data) {
    const token = localStorage.getItem('token')
    return this.http.patch(this.baseUrl + `/comments/${id}`, data, {headers: {Authorization: token}})
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }
  likePost(id): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.baseUrl + `/posts/like/${id}`, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  updateUser(data) {
    const token = localStorage.getItem('token')
    return this.http.patch(this.baseUrl + `/users/current`, data, {headers: {Authorization: token}})
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }
  updatePassword(data) {
    const token = localStorage.getItem('token')
    return this.http.post(this.baseUrl + `/auth/updatePassword`, data, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  getFeed(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.baseUrl + `/posts/feed`, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
  getFollowersAndFollowing(id): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.baseUrl + `/users/followersAndFollowing/${id}`, {headers: {Authorization: token}})
    .pipe(
      catchError(this.hiddenError.bind(this))
    );
  }
}
