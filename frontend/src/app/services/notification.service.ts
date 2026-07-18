import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface NotificationOptions {
    timeOut?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private snackBar: MatSnackBar) { }

    success(message: string, title = '', options: NotificationOptions = {}): void {
        this.open(message, title, 'app-snackbar-success', options);
    }

    error(message: string, title = '', options: NotificationOptions = {}): void {
        this.open(message, title, 'app-snackbar-error', options);
    }

    info(message: string, title = '', options: NotificationOptions = {}): void {
        this.open(message, title, 'app-snackbar-info', options);
    }

    warning(message: string, title = '', options: NotificationOptions = {}): void {
        this.open(message, title, 'app-snackbar-warning', options);
    }

    private open(
        message: string,
        title: string,
        panelClass: string,
        options: NotificationOptions,
    ): void {
        const text = title ? `${title}: ${message}` : message;

        this.snackBar.open(text, 'Dismiss', {
            duration: options.timeOut ?? 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['app-snackbar', panelClass],
        });
    }
}