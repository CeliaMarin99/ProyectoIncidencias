import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //Generamos el token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/login`,loginData);
  }

  //Iniciamos sesión del usuario y guardamos el token en el local storage
  public loginUser(token:any){
    localStorage.setItem('token',token);
  }

  //Comprobamos si el usuario ha iniciado sesión
  public isLoggedIn(){
    let tokenStr=localStorage.getItem('token');
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  //Cerramos sesión del usuario y eliminamos el token del local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //Obtenemos el token del local storage
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //Obtenemos el usuario del local storage
  public getUser(){
    let userStr=localStorage.getItem('user');
    
    if(userStr!=null){ //Si existe el usuario en el local storage
      return JSON.parse(userStr);//Lo parseamos a objeto
    }else{//Si no existe 
      this.logout();//Cerramos sesión
      return null;
    }
  }

  //Obtenemos el rol del usuario
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/users/usuario-actual`);
  }


}
