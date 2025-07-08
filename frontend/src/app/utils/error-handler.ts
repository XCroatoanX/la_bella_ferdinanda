// src/app/utils/error-handler.ts
import {ToastrService} from 'ngx-toastr';

export function handleHttpError(error: any, toastr: ToastrService) {
  switch (error.status) {
    case 400:
      toastr.error('Bad Request: ' + (error.error || 'Please check your input.'), 'Error', {timeOut: 3000});
      break;
    case 401:
      toastr.error('Unauthorized: Please log in to continue.', 'Error', {timeOut: 3000});
      break;
    case 413:
      toastr.error('File too large: Please upload files smaller than 15 MB.', 'Error', {timeOut: 3000});
      break;
    case 500:
      toastr.error('Internal Server Error: Please try again later.', 'Error', {timeOut: 3000});
      break;
    default:
      toastr.error('An unexpected error occurred: ' + (error.error || 'Please try again later.'), 'Error', {timeOut: 3000});
      break;
  }
}

export function handleCatKitError(error: any): void {
  this.isLoading = false;
  console.error('Error creating cat/kitten:', error);
  switch (error.status) {
    case 400:
      this.toastr.error(
        'Bad Request: ' + (error.error || 'Please check your input.'),
        'Error',
        {timeOut: 3000}
      );
      break;
    case 401:
      this.toastr.error(
        'Unauthorized: Please log in to continue.',
        'Error',
        {timeOut: 3000}
      );
      break;
    case 413:
      this.toastr.error(
        'File too large: Please upload files smaller than 15 MB.',
        'Error',
        {timeOut: 3000}
      );
      break;
    case 500:
      this.toastr.error(
        'Internal Server Error: Please try again later.',
        'Error',
        {timeOut: 3000}
      );
      break;
    default:
      this.toastr.error(
        'An unexpected error occurred: ' + (error.error || 'Please try again later.'),
        'Error',
        {timeOut: 3000}
      );
      break;
  }
}

