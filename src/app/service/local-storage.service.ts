import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from '../models/login.dto';
import { RetornoLoginDTO } from '../models/retorno-login.dto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(key: string, valor: string) {
    window.localStorage.setItem(key, valor);
  }

  get(key: string) {
    return window.localStorage.getItem(key);
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
