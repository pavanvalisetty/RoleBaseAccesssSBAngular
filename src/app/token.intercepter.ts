import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./service/auth.service";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) {

    }
    userId: any;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        this.userId = localStorage.getItem('userId');
        const token = this.authService.getToken(this.userId);
        if (token) {
            req = req.clone({
                setHeaders: {
                    //Authorization:`Bearer $ {token}`,
                    Authorization: `Bearer ` + token,
                    'Access-Control-Allow-Origin': '*',
                }
            });
        }
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403) {
                    this.router.navigate(['/unauthoirzed']);
                } else if (error.status === 401) {
                    this.router.navigate(['/login'],{state:{message:'Invalid Credentails'}});
                }
                return throwError(error);
            }
            )
        );
    }

}